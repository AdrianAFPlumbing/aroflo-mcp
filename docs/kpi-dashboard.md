# Jobs & KPI dashboard

URL: the Railway domain root (`/`; `/jobs` also works). Staff log in with name + PIN; admins manage users in the Users tab. The Quote Portal front-end was retired on 2026-10-22 (its tables are kept).

## Data
- Synced from AroFlo every 30 min, 05:30–19:30 Sydney (`KPI_SYNC_MIN`), Plumbing Sydney only. Admins can force a refresh.
- **Respond** = first time a technician was assigned (from AroFlo assigned history).
- **Complete** = first time the job was completed in AroFlo. Reopening to add labour and closing again never moves it.
- KPI windows live in the **KPI rules** tab (admin-editable, per AroFlo priority, optionally per client). Rules marked unconfirmed were inferred from the priority name.
- **Callout**: for jobs attended before the work order arrived. Anyone can set the actual attendance time (must be before the job was received, max 7 days, reason required); it starts the clock and counts as the response. Every change is in `kpi_audit`.

## Portal close-off queue
- Team ticks completed jobs and presses *Close off selected in portal*.
- A scheduled task on Adrian's computer calls the AroFlo connector tools `afp_closeoff_claim` / `afp_closeoff_report` and runs the matching skill in Chrome (UOS, UNSW, Mywork Ausgrid/Asahi, Mywork Defence, BSAFE).
- Real AroFlo times only. Logins/MFA or KPI time conflicts come back as **Needs Adrian**.
