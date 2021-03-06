var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
// var config = require('./config');

var User = new Schema({
  id : String,
  name: String,
  gender: String,
  school: String,
  college: String,
  department: String,
  grade: String,
  student_id: String,
  email: String,
  phone_number: String,
  facebook_link: String,
  club_name:String,
  club_role:String,
  club_story:String,
  scholarships:String,
  scholarships_other:String,
  poor_allowance:String,
  poor_allowance_other:String,
  exchange_student:String,
  exchange_student_other:String,
  course_takes_service_design: String,
  course_takes_art_create: String,
  course_takes_art_design_sale: String,
  course_takes_novel_design: String,
  course_takes_visual_design: String,
  course_takes_novel_bm_design: String,
  course_takes_art_create: String,
  course_takes_ux: String,
  course_takes_global_youth: String,
  course_takes_med: String,
  course_takes_dt: String,
  course_takes_global_theory_do: String,
  course_takes_oldman: String,
  course_takes_novel_cars: String,
  course_takes_warm_tech: String,
  course_takes_none: String,
  course_takes_reviews: String,
  startup_activities_none: String,
  startup_activities_cep_forum: String,
  startup_activities_dt_workshop: String,
  startup_activities_social_project: String,
  startup_activities_intro_seminar: String,
  startup_activities_HackNTU: String,
  startup_activities_NTU_Startup_Day: String,
  startup_activities_startup_matchmaking: String,
  startup_activities_reviews: String,
  startup_problems: String,
  startup_problems_link: String,
  startup_time: String,
  startup_time_link: String,
  contact1_name: String,
  contact1_job: String,
  contact1_relationship: String,
  contact1_phone: String,
  contact1_time: String,
  contact2_name: String,
  contact2_job: String,
  contact2_relationship: String,
  contact2_phone: String,
  contact2_time: String,
  contact3_name: String,
  contact3_job: String,
  contact3_relationship: String,
  contact3_phone: String,
  contact3_time: String,
  // team info
  is_team: { type: Boolean, default: false},
  am_i_leader: String,
  team_name: String,
  leader_name: String,
  leader_school_grade: String,
  member1_name: String,
  member1_school_grade: String,
  member2_name: String,
  member2_school_grade: String,
  team_formation_bm: String,
  team_resource: String,
  team_link: String,
  // team info ---end
  Start_Date: String,
  Submit_Date: String,
  Network_ID: String,
  score: {
    mentor1_score: { type: Number, default: 0},
    mentor2_score: { type: Number, default: 0},
    mentor3_score: { type: Number, default: 0},
    mentor4_score: { type: Number, default: 0}
    // cover_link_score: Number
  },
  result: { type: String, default: "fall"},
  note: String,
});

mongoose.model( 'User', User );
mongoose.connect('mongodb://localhost/ntucep9');