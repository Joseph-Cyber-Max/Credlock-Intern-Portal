import { PrismaClient, Role, InternStatus } from "@prisma/client";

const db = new PrismaClient();

const curriculum = [
["Credlock + Technical Support + Cybersecurity Orientation","Orientation to Credlock, Technical Support, the smartphone BNPL ecosystem, escalation and core cybersecurity principles.",["Understand Credlock operations and support responsibilities","Understand CIA, authentication, authorization, accountability and least privilege"],["Customer, merchant, enrollment and device support"],["CIA triad","Authentication","Authorization","Accountability","Least privilege"],["Simulate a customer who has paid but the smartphone remains locked"],"Orientation report"],
["Smartphone Hardware","Smartphone hardware fundamentals, common faults and cybersecurity relevance.",["Identify major smartphone hardware components","Diagnose common hardware faults"],["Display, battery, charging, buttons, speakers, cameras and connectivity faults"],["Hardware integrity and device security"],["Diagnose five simulated smartphone hardware problems"],"Five documented troubleshooting cases"],
["Android OS","Android operating-system support with security-aware troubleshooting.",["Understand Android versions and permissions","Troubleshoot application and OS issues"],["Android version","App version","Permissions","Connectivity","Account","Device status","Synchronization"],["Screen locks","Encryption","Secure boot","Updates","Malicious apps","Untrusted APKs"],["Follow the Android troubleshooting sequence on simulated cases"],"Android troubleshooting notes"],
["Networking","Networking and connectivity troubleshooting for smartphone support.",["Understand Wi-Fi and mobile data","Use IP, DNS, DHCP and gateway concepts","Diagnose connectivity and server reachability problems"],["Wi-Fi","Mobile data","SIM","IP","DNS","DHCP","Gateway","MAC","VPN","HTTP/HTTPS","TCP/IP","Ports"],["Network security fundamentals"],["Troubleshoot no internet, timeout, DNS and server-unreachable scenarios"],"Network troubleshooting record"],
["Credlock Application Support","Mobile application installation, authentication, permissions, crashes and compatibility.",["Troubleshoot application installation and login issues","Understand secure authentication and sessions","Recognize account takeover and credential-theft risks"],["Install","Update","Login","Registration","Permissions","Cache","Crashes","Network","Version compatibility"],["Passwords","OTP","Sessions","Tokens","Phishing","Credential theft"],["Work through simulated application support cases"],"Mobile Application Troubleshooting SOP"],
["Device Management","Device enrollment and management lifecycle, synchronization and authorized resolution.",["Understand device enrollment","Diagnose policy synchronization failures","Use IMEI and Android ID appropriately"],["Enrollment","Authentication","Policies","Sync","Last sync","Device state","Lock","Authorized unlock"],["Device-management security controls"],["Diagnose simulated enrollment and synchronization failure states"],"Device Management Troubleshooting Guide"],
["Customer Data Security","Protect customer information while providing technical support.",["Apply data minimization","Verify and authenticate before assistance","Avoid unnecessary exposure of sensitive information"],["Customer information handling during support"],["Privacy","Data minimization","Secure information handling"],["Respond to a merchant asking for NIN/BVN while following data-protection rules"],"Customer Data Protection Checklist"],
["Mobile Cybersecurity & Incident Response","Recognize mobile threats and follow a structured incident-response process.",["Identify common mobile threats","Collect appropriate evidence","Escalate security incidents correctly"],["Suspicious apps","Unauthorized access","Device and account issues"],["Malicious APKs","Phishing","Fake apps","SIM attacks","Account takeover","Credential theft","Social engineering","Malware"],["Handle an unauthorized account-access scenario"],"Mobile Security Incident Report"],
["APIs, Logs & Backend Awareness","Read application/device/server logs and understand API troubleshooting without exposing credentials.",["Interpret common HTTP status codes","Read JSON and API request/response patterns","Trace an issue across support layers"],["App logs","Device logs","Server logs","API requests/responses","JSON","Timestamps"],["Protect API credentials and production data"],["Investigate a device enrollment stuck at Awaiting Enrollment"],"API/log investigation record"],
["Ticketing & Engineering Escalation","Professional ticket lifecycle, prioritization and engineering escalation.",["Classify support priority","Document reproducible technical issues","Escalate with sufficient evidence"],["New → Triage → Assigned → Investigating → Escalated → Engineering/Security → Resolved → Verified → Closed"],["Security-sensitive escalation"],["Create a complete engineering escalation ticket"],"Engineering Escalation Framework"],
["Reporting, SOPs & Recurring Issues","Use support data to identify recurring issues and improve SOPs.",["Analyze issue frequency and patterns","Document recurring problems","Recommend process improvements"],["Issue category","Device model","Android/app version","Error","Resolution","Engineering involvement"],["Identify recurring security-related patterns"],["Analyze a sample set of recurring smartphone issues"],"Recurring Smartphone Technical Issue Report"],
["Final Capstone","End-to-end support investigation for a customer whose phone remains locked despite the loan showing 0 days overdue.",["Apply the full support workflow","Determine support versus escalation","Document and verify an authorized resolution"],["Ticket creation","Device identification","Enrollment","Authentication","Connectivity","Policy sync","App-server communication"],["Customer verification","Evidence protection","Security implications"],["Complete the capstone investigation and final report"],"Final capstone report and competency evidence"]
];

const skills = [
["Smartphone Troubleshooting","Smartphone Support"],["Android OS Support","Smartphone Support"],["Device Management","Credlock Operations"],["Mobile Application Support","Smartphone Support"],["Networking Troubleshooting","Networking"],["API Troubleshooting","System Investigation"],["Log Analysis","System Investigation"],["Ticket Management","Professional Support"],["Engineering Escalation","Professional Support"],["Customer Data Protection","Cybersecurity"],["Mobile Cybersecurity","Cybersecurity"],["Incident Response","Cybersecurity"],["Documentation & SOP","Professional Support"],["Reporting & Analytics","Professional Support"],["Root-Cause Reasoning","System Investigation"]
];

const pillars = [
["Smartphone Support","Smartphone troubleshooting and device support"],["Credlock Operations","Understanding Credlock support and BNPL operations"],["Cybersecurity","Security, privacy and incident awareness"],["System Investigation","Logs, APIs, networking and root-cause analysis"],["Professional Support","Ticketing, documentation, communication and escalation"]
];

async function main() {
  const program = await db.program.upsert({
    where: { name: "Credlock Africa — Cybersecurity & Smartphone Technical Support Internship Programme" },
    update: {},
    create: { name: "Credlock Africa — Cybersecurity & Smartphone Technical Support Internship Programme", description: "12-week internship programme focused on Cybersecurity, Smartphone Technical Support, Device Management and BNPL Operations." }
  });

  for (const name of ["Technical Support","Software Engineering","Operations","Data & Analytics","Accounts & Finance","Collections","Merchant Enrollment"])
    await db.department.upsert({ where: { name }, update: {}, create: { name } });

  for (const [name,category] of skills)
    await db.skill.upsert({ where: { name }, update: { category }, create: { name, category } });

  for (const [name,description] of pillars)
    await db.competencyPillar.upsert({ where: { name }, update: { description }, create: { name, description } });

  for (const [name,weight] of [["Smartphone Support",30],["Credlock Operations",20],["Cybersecurity",30],["Networking/API/System Troubleshooting",20]])
    await db.quizCategory.upsert({ where: { name: name as string }, update: { weight: weight as number }, create: { name: name as string, weight: weight as number } });

  for (const [index,item] of curriculum.entries()) {
    const weekNo = index + 1;
    const [title,description,objectives,technical,cybersecurity,practical,deliverable] = item as [string,string,string[],string[],string[],string[],string];
    const week = await db.programWeek.upsert({
      where: { programId_week: { programId: program.id, week: weekNo } },
      update: { title,description,objectives,technical,cybersecurity,practical,deliverable },
      create: { programId: program.id,week: weekNo,title,description,objectives,technical,cybersecurity,practical,deliverable }
    });
    const module = await db.learningModule.upsert({
      where: { week_programWeekId: { week: weekNo,programWeekId: week.id } },
      update: { title,description },
      create: { week: weekNo,title,description,programWeekId: week.id }
    });
    for (const [i,objective] of objectives.entries()) {
      const id = `seed-week-${weekNo}-objective-${i+1}`;
      await db.learningObjective.upsert({ where:{id}, update:{objective,order:i+1}, create:{id,moduleId:module.id,objective,order:i+1} });
    }
  }

  const user = await db.user.upsert({
    where: { email: "intern@credlock.africa" },
    update: {},
    create: { email: "intern@credlock.africa",name:"Demo Intern",role:Role.INTERN,passwordHash:"DEMO_REPLACE_WITH_HASH" }
  });
  const dept = await db.department.findUnique({ where:{name:"Technical Support"} });
  const intern = await db.intern.upsert({
    where:{userId:user.id},
    update:{programId:program.id,departmentId:dept?.id,status:InternStatus.ACTIVE,internId:"CRK-DEMO-001"},
    create:{userId:user.id,internId:"CRK-DEMO-001",programId:program.id,departmentId:dept?.id,status:InternStatus.ACTIVE,startDate:new Date()}
  });

  for (const [i,[title,description]] of [
    ["Smartphone Troubleshooting Knowledge Base","Create a structured troubleshooting knowledge base for common smartphone support issues."],
    ["Device Management Troubleshooting Guide","Document enrollment, synchronization and authorized device-management troubleshooting."],
    ["Mobile Cybersecurity Checklist","Create a practical checklist for mobile security and customer-data protection."],
    ["Engineering Escalation Framework","Create a standardized engineering escalation format with evidence and business impact."],
    ["Recurring Issue Analysis","Analyze recurring support issues and propose SOP or system improvements."]
  ].entries()) {
    const id = `seed-project-${intern.id}-${i+1}`;
    await db.project.upsert({where:{id},update:{title,description},create:{id,title,description,internId:intern.id}});
  }

  console.log("Credlock internship programme seed completed.");
}

main().catch(error => { console.error(error); process.exit(1); }).finally(() => db.$disconnect());
