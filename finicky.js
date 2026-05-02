workProfile = {
  name: "Google Chrome",
  profile: "datadoghq.com",
  openInBackground: false,  // removes an 100ms delay
};

govCloudProfile = {
  name: "Google Chrome",
  profile: "ddog-gov.com",
  openInBackground: false,  // removes an 100ms delay
};

personalProfile = {
  name: "Google Chrome",
  profile: "Personal",
  openInBackground: false,  // removes an 100ms delay
};

googleWorkspaceHostnames = [
  "gmail.com",
  "mail.google.com",
  "drive.google.com",
  "docs.google.com",
  "sheets.google.com",
  "slides.google.com",
  "docs.new",
  "sheets.new",
  "slides.new",
  "forms.new",
]

salesforceHostnames = [ // https://help.salesforce.com/s/articleView?id=sf.domain_name_enhanced.htm&type=5
  "datadog.my.salesforce.com",
  "datadog.file.force.com",
  "datadog.my.site.com",
  "datadog.builder.salesforce-experience.com",
  "datadog.my.salesforce-sites.com",
  /datadog--.*\.vf\.force\.com/,
  /datadog--.*\.sandbox\.my\.salesforce\.com/,
  /datadog--.*\.sandbox\.my\.site\.com/,
]

microsoftHostnames = [
  "login.microsoftonline.com",
  "portal.azure.com",
]

module.exports = {
  defaultBrowser: "Google Chrome", // https://github.com/johnste/finicky/wiki/Configuration#selecting-a-browser
  handlers: [
	{
	  match: [
		/ddog-gov.com/,
		/fed.dog/,
		/ddog-gov.enterprise.slack.com/,
		/datadog-fed.slack.com/,
		"https://accounts.google.com/o/saml2/idp?idpid=C03lf3ewa*",  // SAML login for ddog-gov organization (used by AppGate)
	  ],
	  browser: govCloudProfile,
	},
	{
	  match: [
		/datadoghq.com/,
		/.dog/,
		/ddbuild.io/,
		/localhost:8250/,  // Vault
		/dd.slack.com/,
		/dd.enterprise.slack.com/,
		/github.com/,
		/datadoghq.atlassian.net/,
		/datadog.pagerduty.com/,
		/datadog.greenhouse.io/,
		/datadog.freshservice.com/,
		/aws.amazon.com/,
		/wd5.myworkday.com\/datadog/,
		/docs.google.com/,
		"https://accounts.google.com/o/saml2/idp?idpid=C0147pk0i*",  // SAML login for datadoghq organization (used by AppGate)
		"https://accounts.google.com/o/oauth2/v2/auth?client_id=1023266953562-2nltfg1vsh570fr2npin7klkn8lo3g6e.apps.googleusercontent.com*",  // Second SAML login (still guessing)
        /claude.ai/,
        /workos.com/,
	  ],
	  browser: workProfile,
	},
	{
	  match: [
		/youtube.com/,
	  ],
	  browser: personalProfile
	},
	{
	  match: [
		"zoom.us/j/*",
		finicky.matchDomains(/.*\zoom.us\/j/),
		/zoom.us\/j\//,
	  ],
	  browser: "us.zoom.xos"
	},
	{
	  match: "open.spotify.com/*",
	  browser: "Spotify"
	},
	{ // Google Logins (including Appgate)
	  match: [/^https:\/\/accounts\.google\.com\/o\/saml2\/idp/, /^https:\/\/accounts\.google\.com\/ServiceLogin/],
		browser: "Google Chrome"
	},
	{ // Google Workspace
	  match: [finicky.matchHostnames(googleWorkspaceHostnames), ({ opener }) => opener.bundleId === "com.google.drivefs"],
	  browser: "Google Chrome"
	},
	{ // Salesforce
	  match: finicky.matchHostnames(salesforceHostnames),
	  browser: "Google Chrome"
	},
	{ // Azure & Microsoft 365
	  match: [finicky.matchHostnames(microsoftHostnames), finicky.matchDomains("office.com")],
	  browser: "Google Chrome"
	},
  ],
};
