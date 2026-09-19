require('dotenv').config({ path: '.env.local' });

async function inspectCreateMeta() {
  const baseUrl = process.env.JIRA_BASE_URL;
  const projectKey = process.env.JIRA_PROJECT_KEY || 'DFX';
  const email = process.env.JIRA_EMAIL;
  const token = process.env.JIRA_API_TOKEN;
  const authHeader = `Basic ${Buffer.from(`${email}:${token}`).toString('base64')}`;

  const res = await fetch(`${baseUrl}/rest/api/2/issue/createmeta?projectKeys=${projectKey}&expand=projects.issuetypes.fields`, {
    headers: { 'Authorization': authHeader, 'Accept': 'application/json' }
  });

  const data = await res.json();
  const proj = data.projects[0];
  console.log('Project:', proj.name);
  for (const it of proj.issuetypes) {
    console.log(`\n=== Issue Type: ${it.name} (id: ${it.id}) ===`);
    const reqFields = Object.keys(it.fields).filter(f => it.fields[f].required);
    console.log('Required fields:', reqFields);
    console.log('All fields:', Object.keys(it.fields).map(f => `${f} (${it.fields[f].name})`));
  }
}

inspectCreateMeta().catch(console.error);
