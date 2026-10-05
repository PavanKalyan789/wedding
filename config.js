/* ===== EDIT THIS FILE ONLY — all wedding details live here ===== */
const C={
  couple:{first:"Pavan Kalyan",second:"Harshini"},
  event:{greetingTe:"శుభమస్తు",titleTe:"వివాహ విందు",titleEn:"Wedding Reception",dateShort:"NOV | 27TH | 2026",dateText:"Friday, 27 November 2026",time:"6:30 pm onwards",startISO:"2026-11-27T18:30:00+05:30",endISO:"2026-11-27T22:00:00+05:30"},
  invitation:{te:"వివాహ బంధంతో ఒక్కటైన శుభ సందర్భంగా, వారి వివాహ విందు కార్యక్రమానికి మీరు కుటుంబ సమేతంగా విచ్చేసి నూతన వధూవరులను ఆశీర్వదించి మమ్మల్ని ఆనందింపజేయవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.",en:"With the blessings of our parents and elders, we invite you and your family to celebrate with us. Your presence means the world to us."},
  venue:{name:"AARIF SEA SIDE RESORTS",address:"" /* add address line here if you want it shown */,mapsUrl:"https://maps.app.goo.gl/y8UFgffUGSCoScvd8"},
  programme:[["6:30 PM","Guests Welcome","అతిథుల స్వాగతం"],["7:00 PM","Reception & Blessings","ఆశీర్వాదాలు"],["7:30 PM","Couple Photography","దంపతుల ఫోటోగ్రఫీ"],["8:00 PM","Dinner","విందు భోజనం"]],
  rsvp:{link:""},          /* a Google Form URL, or leave "" for the built-in form */
  music:"assets/music.mp3",   /* audio URL or data URI; "" = no music */
  autoplaySeconds:6.5
};
async function submitRSVP(d){console.log("RSVP",d)} /* connect Sheets/Firebase/Supabase */
/* ===================== */
