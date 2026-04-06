---
title: Deployment
sidebar_position: 12
---

# Deployment

This page documents how to deploy FIS on a Linux server — running a Linux distribution such as Ubuntu Server 22.04 LTS.

---

## Server Requirements

| Component | Minimum | Recommended |
|---|---|---|
| CPU | 4 cores | 8+ cores |
| RAM | 8 GB | 16 GB |
| Storage | 100 GB SSD | 500 GB SSD |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |
| Network | 100 Mbps | 1 Gbps |

---

## Architecture on the Server

```
Internet / Intranet
        │
        ▼
    Nginx (port 80 / 443)
        │
   ┌────┴────┐
   │         │
   ▼         ▼
Client     Server API
(static)  (port 3000)
           │
           ▼
       PostgreSQL
       (port 5432)
```

Nginx acts as a reverse proxy and static file server:
- Serves the React client build as static files
- Proxies `/api` requests to the NestJS server on port 3000
- Handles SSL termination (if configured)

The NestJS server is managed by **PM2** — a process manager that keeps it running, restarts it on crash, and starts it automatically on server reboot.

---

## Software to Install on Server

- Node.js v20 LTS
- npm
- PostgreSQL 15
- Nginx
- PM2
- Git

---

## Step 1 — Initial Server Setup

SSH into your server:

```bash
ssh your-username@your-server-ip
```

Update the system:

```bash
sudo apt update && sudo apt upgrade -y
```

Install Git:

```bash
sudo apt install git -y
```

---

## Step 2 — Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
node -v   # should print v20.x.x
npm -v
```

---

## Step 3 — Install PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

Create the database and user:

```bash
sudo -u postgres psql
```

Inside the PostgreSQL shell:

```sql
CREATE DATABASE fis;
CREATE USER fisuser WITH ENCRYPTED PASSWORD 'your_strong_password';
GRANT ALL PRIVILEGES ON DATABASE fis TO fisuser;
\q
```

---

## Step 4 — Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Step 5 — Install PM2

```bash
sudo npm install -g pm2
```

---

## Step 6 — Clone the Repositories

Create an app directory:

```bash
sudo mkdir -p /var/www/fis
sudo chown $USER:$USER /var/www/fis
cd /var/www/fis
```

Clone both repositories:

```bash
git clone https://github.com/YOUR_USERNAME/fis-server.git
git clone https://github.com/YOUR_USERNAME/fis-client.git
```

---

## Step 7 — Configure and Build the Server

```bash
cd /var/www/fis/fis-server
npm install
```

Create the production `.env` file:

```bash
nano .env
```

Paste and fill in your values:

```env
DATABASE_URL="postgresql://fisuser:your_strong_password@localhost:5432/fis"
JWT_SECRET="your_long_random_secret_here"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
RESEND_API_KEY="re_your_key_here"
FROM_EMAIL="noreply@yourinstitution.ac.in"
```

Run database migrations and seed:

```bash
npx prisma migrate deploy
npm run seed
```

Build the server:

```bash
npm run build
```

Start with PM2:

```bash
pm2 start dist/main.js --name fis-server
pm2 save
pm2 startup
```

Run the command that `pm2 startup` outputs — it will look like:

```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u your-username --hp /home/your-username
```

---

## Step 8 — Configure and Build the Client

```bash
cd /var/www/fis/fis-client
```

Create the production `.env` file:

```bash
nano .env
```

```env
VITE_API_URL=http://your-server-ip-or-domain/api
```

Install dependencies and build:

```bash
npm install
npm run build
```

The built files are in `dist/`. Copy them to the Nginx web root:

```bash
sudo cp -r dist /var/www/fis/client-build
```

---

## Step 9 — Configure Nginx

Create an Nginx config file:

```bash
sudo nano /etc/nginx/sites-available/fis
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name your-server-ip-or-domain;

    # Serve React client static files
    root /var/www/fis/client-build;
    index index.html;

    # React Router — serve index.html for all non-file routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to NestJS server
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and test the configuration:

```bash
sudo ln -s /etc/nginx/sites-available/fis /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 10 — Update CORS on the Server

Update `main.ts` in `fis-server` to allow requests from your server's IP or domain:

```typescript
app.enableCors({
  origin: 'http://your-server-ip-or-domain',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
```

Rebuild and restart:

```bash
cd /var/www/fis/fis-server
npm run build
pm2 restart fis-server
```

---

## Step 11 — Verify the Deployment

Open a browser and navigate to `http://your-server-ip-or-domain`. You should see the FIS landing page.

Check that the server is running:

```bash
pm2 status
pm2 logs fis-server
```

Check Nginx logs if there are issues:

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

---

## Updating the Application

When you push changes to GitHub and want to deploy them:

### Update the server

```bash
cd /var/www/fis/fis-server
git pull origin main
npm install
npx prisma migrate deploy
npm run build
pm2 restart fis-server
```

### Update the client

```bash
cd /var/www/fis/fis-client
git pull origin main
npm install
npm run build
sudo rm -rf /var/www/fis/client-build
sudo cp -r dist /var/www/fis/client-build
```

---

## Firewall Configuration

Allow only necessary ports:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

PostgreSQL port 5432 should NOT be exposed externally — it is only accessed locally by the NestJS server.

---

## SSL / HTTPS (Optional but Recommended)

If you have a domain name pointed to your server, use Certbot to get a free SSL certificate from Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.ac.in
```

Certbot will automatically update your Nginx config to redirect HTTP to HTTPS and handle certificate renewal.

If you are running on an internal network without a public domain, you can generate a self-signed certificate:

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/fis.key \
  -out /etc/ssl/certs/fis.crt
```

Then update the Nginx config to use it:

```nginx
server {
    listen 443 ssl;
    server_name your-server-ip-or-domain;

    ssl_certificate /etc/ssl/certs/fis.crt;
    ssl_certificate_key /etc/ssl/private/fis.key;

    root /var/www/fis/client-build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name your-server-ip-or-domain;
    return 301 https://$host$request_uri;
}
```

---

## PM2 Useful Commands

```bash
pm2 status                    # Check running processes
pm2 logs fis-server           # Live logs
pm2 restart fis-server        # Restart after code change
pm2 stop fis-server           # Stop the server
pm2 delete fis-server         # Remove from PM2
pm2 monit                     # Real-time monitoring dashboard
```

---

## PostgreSQL Backup

Set up a daily database backup with cron:

```bash
crontab -e
```

Add this line to back up daily at 2 AM:

```bash
0 2 * * * pg_dump -U fisuser fis > /var/backups/fis-$(date +\%Y\%m\%d).sql
```

Create the backups directory:

```bash
sudo mkdir -p /var/backups
sudo chown $USER:$USER /var/backups
```

To restore from a backup:

```bash
psql -U fisuser fis < /var/backups/fis-20260401.sql
```
