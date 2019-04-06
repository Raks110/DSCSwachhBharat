var questions = [
  {
    'title':'1. NMCG stands for',
    'option1':'National Mission for Clean Ganga',
    'option2':'Narendra Modi Central Government',
    'option3':'National Mission for Clean Government',
    'option4':'National Merit for Computer Geniuses',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'2. When did Swachh Bharat Mission start?',
    'option1':'January 26, 2015',
    'option2':'November 14, 2014',
    'option3':'October 2, 2014',
    'option4':'January 31, 2015',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'3. What does ODF stand for?',
    'option1':'Operational Defense Fee',
    'option2':'Open Defecation Free',
    'option3':'Operational Deployment Framework',
    'option4':'Open Demonstration Fee',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'4. Which of the following states are free of open defecation?',
    'option1':'Assam',
    'option2':'Odisha',
    'option3':'Goa',
    'option4':'Karnataka',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'5. Who initiated Swachh Bharat Movement?',
    'option1':'Narendra Modi',
    'option2':'Rahul Gandhi',
    'option3':'Arun Jaitley',
    'option4':'Sadhu Manohar',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'6. What is the slogan of Swachh Bharat?',
    'option1':'One Step Towards Cleanliness',
    'option2':'Clean India Healthy India',
    'option3':'This is the New India',
    'option4':'Together We Can',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'7. When was rural sanitation campaign first launched?',
    'option1':'2014',
    'option2':'1997',
    'option3':'1981',
    'option4':'1954',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'8. Which awards were given to people for keeping their villages clean?',
    'option1':'Swachhtha Puraskar',
    'option2':'Swachh Grameen Puraskar',
    'option3':'Nirmal Gram Puraskar',
    'option4':'Jyothi Puraskar',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'9. Which program was the successor of Total Sanitation Program?',
    'option1':'Swachhta Kadam',
    'option2':'Nirmal Bharat Abhiyan',
    'option3':'Rigorous Sanitary Movement',
    'option4':'Sanitation Campaign',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'10. Which ministry initiated the Swachh Bharat Abhiyan?',
    'option1':'Ministry of Rural Development',
    'option2':'Department of Safety',
    'option3':'Ministry of Human Hygiene',
    'option4':'Ministry of Drinking Water and Sanitation',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'11. What is the goal of Swachh Bharat Abhiyan?',
    'option1':'Swachh Bharat by 2019',
    'option2':'Free of Open Defecation by 2040',
    'option3':'HDI up to 7 by 2019',
    'option4':'Toilet built into every home by 2020',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'12. How much money has been allocated by center for the SBM (Urban)?',
    'option1':'Rs. 14,623 crores',
    'option2':'Rs. 15,000 crores',
    'option3':'Rs. 10,231 crores',
    'option4':'Rs. 12,300 crores',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'13. How much money has been allocated for solid waste management under SBM (urban)?',
    'option1':'Rs. 7121 crores',
    'option2':'Rs. 7366 crores',
    'option3':'Rs. 7900 crores',
    'option4':'Rs. 7961 crores',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'14. Who composed the audio track "Swachh Bharat ka Irada Karliya hum ne"?',
    'option1':'Prasoon Joshi',
    'option2':'Namak Agarwal',
    'option3':'Mika',
    'option4':'Mohit Rastogi',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'15. Who designed the logo of Swachh Bharat Abhiyan?',
    'option1':'Arijit from West Bengal',
    'option2':'Meenakshi from Tamil Nadu',
    'option3':'Ravinder from Punjab',
    'option4':'Anant from Maharashtra',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'16. Which is the twitter hashtag for Swachh Bharat Mission?',
    'option1':'#MyIncredibleIndia',
    'option2':'#MyCleanIndia',
    'option3':'#MyVibrantIndia',
    'option4':'#MyIndiaCleanIndia',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'17. Which mission did Maneka Sanjay Gandhi launch on 14th Nov, 2014?',
    'option1':'Nari Swachhta Mission',
    'option2':'Grameen Swachhta Mission',
    'option3':'National Bal Swachhta Mission',
    'option4':'National Women Upliftment Mission',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'18. When did the Central Rural Sanitation Program (CRSP) begin?',
    'option1':'1995',
    'option2':'1974',
    'option3':'1981',
    'option4':'1986',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'19. What is the full form of SLF?',
    'option1':'Sanitary Landfills',
    'option2':'Sanitary Load Facility',
    'option3':'Sanitary Leaflets',
    'option4':'Sanitary Local Facility',
    'markedForReview':false,
    'checked':false,
    'visited':false
  },
  {
    'title':'20. On which date does India observe World Toilet Day?',
    'option1':'October 2',
    'option2':'November 29',
    'option3':'September 15',
    'option4':'December 26',
    'markedForReview':false,
    'checked':false,
    'visited':false
  }
];

module.exports.questions = questions;
