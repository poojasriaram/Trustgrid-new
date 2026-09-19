# 🚀 TrustGrid.AI — Enterprise 95-Column Behavioral Telemetry & Google Sheets Intelligence Suite

This guide documents the enterprise-grade **95-Column Behavioral Telemetry & Intelligence Engine** for **TRUSTGRID.AI**, completely modeled on the live production schema from [Google Sheet Ref: `1B7hkCHLPeNVVnaPJ89ZO8R9nv4FngAzzqvwyK0zqnWM`](https://docs.google.com/spreadsheets/d/1B7hkCHLPeNVVnaPJ89ZO8R9nv4FngAzzqvwyK0zqnWM/edit?gid=153939990#gid=153939990).

---

## 📁 Google Apps Script Files in Workspace

| Script File | Target Spreadsheet | Purpose |
| :--- | :--- | :--- |
| [`google-apps-script/Code.gs`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/google-apps-script/Code.gs) | **Sheet 1** (Live Telemetry & Lead Webhook) | Ingests the complete 95-column behavioral telemetry payload, captures leads, handles batch event ingestion, and auto-initializes database tables. |
| [`TRUSTGRID_SHEET1_WEBHOOK.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET1_WEBHOOK.js) | **Sheet 1** (Data Collection & Webhook) | Full production webhook engine with 95-column telemetry, 18 dedicated form tables, Google Drive resume archiving, and high-priority HTML emails. |
| [`google-apps-script/Behavioral_Analytics_Engine.gs`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/google-apps-script/Behavioral_Analytics_Engine.gs) | **Sheet 2** (Behavioral Analytics) | Deep behavioral analysis engine: Buyer Intent Matrix, Rage Click & UX Friction Forensics, Micro-Funnel Drop-offs, Journey Flows, and Performance correlations. |
| [`TRUSTGRID_SHEET2_ANALYTICS.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET2_ANALYTICS.js) | **Sheet 2** (Master Executive Dashboard) | 22-tab executive intelligence suite with automated data sanitization (localhost purging) and custom menu controls. |

---

## 📊 Complete 95-Column Telemetry Schema

The database in Sheet 1 (`Live_Traffic_Events`) captures the exact 95 granular attributes in 1-to-1 alignment with your reference sheet:

```
1.  ip_address                 25. referrer_url               49. section                    73. viewport_width
2.  geo_country                26. campaign_name              50. element_type               74. viewport_height
3.  geo_state                  27. utm_source                 51. element_id                 75. language
4.  geo_city                   28. utm_medium                 52. element_class              76. timezone
5.  geo_latitude               29. utm_campaign               53. element_text               77. network_type
6.  geo_longitude              30. utm_term                   54. click_position_x           78. connection_speed
7.  user_id                    31. utm_content                55. click_position_y           79. page_load_time
8.  user_name                  32. page                       56. form_id                    80. dom_load_time
9.  user_email                 33. page_url                   57. form_field_name            81. first_contentful_paint
10. user_type                  34. previous_page              58. form_completion_status     82. largest_contentful_paint
11. returning_user             35. next_page                  59. form_abandonment           83. time_to_interactive
12. first_visit_timestamp      36. entry_page                 60. goal_name                  84. js_error_message
13. last_visit_timestamp       37. exit_page                  61. goal_completed             85. api_error_message
14. total_sessions             38. page_title                 62. conversion_id              86. http_status_code
15. total_time_spent           39. time_on_page               63. conversion_value           87. cpu_cores
16. avg_session_duration       40. scroll_percentage          64. funnel_step                88. memory_size
17. session_id                 41. max_scroll_depth           65. device_type                89. tab_visibility_status
18. session_number             42. interaction_count          66. device_brand               90. back_button_used
19. session_start_time         43. inactivity_time            67. device_model               91. copy_event
20. session_end_time           44. event_id                   68. operating_system           92. paste_event
21. total_session_duration     45. event_name                 69. browser                    93. rage_click_detected
22. total_pages_visited        46. event_category             70. browser_version            94. user_segment
23. bounce                     47. event_action               71. screen_width               95. timestamp
24. traffic_source             48. event_label                72. screen_height
```

---

## 🧠 Behavioral Analysis Intelligence Capabilities

### 1. 🎯 Buyer Intent & User Segmentation Matrix
- **Automated Intent Scoring (0 - 100)**: Evaluates high-value actions (form starts, diagnostic views, scroll depth >75%, dwell time >60s, return visits).
- **Dynamic Segments**:
  - `High-Intent Lead`: Actively booking diagnostics or submitting RFPs.
  - `Enterprise Evaluation`: Deeply exploring solutions, compliance, and governance architecture.
  - `Product Explorer`: Multi-page browsing of offerings, features, and capabilities.
  - `Technical Evaluator`: High dwell time on documentation and architecture pages.
  - `Casual Browser`: Quick single-page visits.

### 2. 🔥 UX Friction & Rage Click Diagnostics
- **Rage Click Detection**: Automatically triggers when a visitor performs $\ge 3$ rapid clicks within 500ms in a 35px radius.
- **Frustration Hotspots**: Ranks the exact HTML tags, classes, and page paths causing user friction.
- **Dead Click Forensics**: Highlights clicks on non-responsive elements with exact $(X, Y)$ screen coordinates.

### 3. 🌊 Micro-Funnel & Form Drop-off Forensics
- **Field-by-Field Abandonment**: Tracks which exact field (`company`, `phone`, `budget`, `timeline`) causes drop-offs.
- **Completion Velocity**: Measures start rate vs submission rate for every form.

### 4. 🧭 Visitor Journey Flow & Sankey Paths
- **Navigation Pathing**: Reconstructs the journey from `Entry Page` $\rightarrow$ `Secondary Pages` $\rightarrow$ `Conversion Goal` or `Exit Page`.
- **Bounce Attribution**: Analyzes bounce probability across Google Organic, LinkedIn Ads, and Direct traffic.

### 5. ⚡ Web Vitals vs Bounce Correlation
- Correlates First Contentful Paint (FCP) and Largest Contentful Paint (LCP) performance tiers with visitor retention.

### 6. 📋 High-Interest Content Snippets
- Records and aggregates text and specifications copied by visitors to reveal high-interest focus areas.

---

## ⚙️ Step-by-Step Deployment Guide

### 1️⃣ Sheet 1 Configuration (Data Collection & Webhook)
1. Open your **Sheet 1 Spreadsheet** (`1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0`).
2. Go to **Extensions $\rightarrow$ Apps Script**.
3. Paste [`TRUSTGRID_SHEET1_WEBHOOK.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET1_WEBHOOK.js) (or `google-apps-script/Code.gs`).
4. In the Apps Script toolbar function dropdown:
   - Select **`initializeMasterTelemetrySheet`** and click **Run** (Creates the 95-column `Live_Traffic_Events` table with cyber styling).
   - Select **`initializeAllDatabaseTables`** and click **Run** (Pre-creates all dedicated form tables).
5. Click **Deploy $\rightarrow$ Manage Deployments $\rightarrow$ New Version** to ensure the live Web App URL receives data.

---

### 2️⃣ Sheet 2 Configuration (Behavioral Analytics Hub)
1. Open your **Sheet 2 Spreadsheet** (`1jC53QN1qiuiRFLzdneA46TECBztER5btTo7qGphb5TM`).
2. Go to **Extensions $\rightarrow$ Apps Script**.
3. Paste [`google-apps-script/Behavioral_Analytics_Engine.gs`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/google-apps-script/Behavioral_Analytics_Engine.gs) and [`TRUSTGRID_SHEET2_ANALYTICS.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET2_ANALYTICS.js).
4. Verify `DATA_SHEET_ID` is set to your Sheet 1 ID (`1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0`).
5. Refresh the spreadsheet page. A custom top menu **🚀 TRUSTGRID ANALYTICS** will appear:
   - Click **🧠 Run Deep Behavioral Analysis** to generate the 6 behavioral tabs:
     - `🎯 Buyer Intent Matrix`
     - `🔥 UX Friction & Rage Clicks`
     - `🌊 Micro-Funnel Forensics`
     - `🧭 Visitor Journey Flow`
     - `⚡ Performance vs Bounce`
     - `📋 High-Interest Content`
   - Click **🔄 Refresh All Dashboards** to update all 22 executive and behavioral reports simultaneously!
