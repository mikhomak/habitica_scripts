 function scheduleJoinQuest() {
   var habId = "CHANGE HERE";
   var habToken = "CHANGE HERE";
 
   var paramsTemplate = {
     "method" : "get",
     "headers" : {
       "x-api-user" : habId, 
       "x-api-key" : habToken    
     }
   }  
   var response = UrlFetchApp.fetch("https://habitica.com/api/v3/groups/party", paramsTemplate);
   var party = JSON.parse(response);
 
   if ((party.data.quest.key != undefined) && (party.data.quest.active != true) && (party.data.quest.members[habId] == undefined)){
   paramsTemplate = {
       "method" : "post",
       "headers" : {
         "x-api-user" : habId, 
         "x-api-key" : habToken       
       }     
     }
     var params = paramsTemplate;
  
     UrlFetchApp.fetch("https://habitica.com/api/v3/groups/party/quests/accept", params)
   }
 }

