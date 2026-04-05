---
title: Approvals
sidebar_position: 1
---

# Approvals

The Approvals section is where the admin reviews and acts on pending faculty registration requests. Every new faculty account starts in `PENDING` status and must be approved before the faculty member can edit their profile.

---

## Accessing Approvals

Click **Approvals** in the admin sidebar. The page shows all faculty accounts currently in `PENDING` status, ordered from oldest to newest.

---

## Pending Account Card

Each pending account displays:

- **Name** — the faculty member's full name as entered during registration
- **Email** — their registered email address
- **Department** — the department they selected at registration
- **Applied** — the date they registered

---

## Approving an Account

1. Find the faculty account you want to approve
2. Click the green **Approve** button
3. A confirmation dialog appears — click **Approve** to confirm
4. The account status changes to `APPROVED`
5. The card disappears from the pending list
6. The faculty member can now log in and access their full dashboard

:::info
The faculty member does not receive an automatic email notification on approval unless email notifications are configured on the server. Inform them through your institutional communication channels.
:::

---

## Rejecting an Account

1. Find the faculty account you want to reject
2. Click the red **Reject** button
3. A reason input appears below the card
4. Type the reason for rejection — this is required before confirming
5. Click **Confirm** to reject
6. The account status changes to `REJECTED`
7. The card disappears from the pending list

The faculty member can still log in after rejection but cannot edit their profile. They will see a rejected status message on their dashboard.

:::warning
Rejection is not permanent in the database sense — an admin can manually update the status via direct database access if needed. However, there is no UI workflow to re-approve a rejected account currently. Ensure you are certain before rejecting.
:::

---

## No Pending Accounts

When there are no pending accounts, the page displays a celebration message indicating the queue is empty.

---

## After Approval

Once approved, the faculty member's account is reflected in:

- **Faculty list** (`/admin/faculty`) — appears with `APPROVED` status
- **System stats** (`/admin/dashboard`) — approved count increments
- **Faculty directory** (`/directory`) — their profile becomes visible to the public
- **Analytics reports** — their data is included in all report calculations
