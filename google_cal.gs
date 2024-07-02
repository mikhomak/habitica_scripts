 function scheduleToDos() {
   var habId = "CHANGE HERE";
   var habToken = "CHANGE HERE";
 
   var now = new Date();
   var events = CalendarApp.getCalendarsByName("Reminders")[0].getEvents(now, new Date(now.getFullYear(), now.getMonth() + 1, 1));
 
   var paramsTemplate = {
     "method" : "post",
     "headers" : {
       "x-api-user" : habId, 
       "x-api-key" : habToken
     }
   }
 
    var todosParams = {
     "method" : "get",
     "headers" : {
       "x-api-user" : habId, 
       "x-api-key" : habToken
     }
   };
    var todoResponse = UrlFetchApp.fetch("https://habitica.com/api/v3/tasks/user?type=todos", todosParams);
    var todos = JSON.parse(todoResponse.getContentText()).data.map( (q) => q.text )

   for (i = 0; i < events.length; i++) {
   var exists = false;
     for(j = 0; j < todos.length; j++){
      exists |= events[i].getTitle() == todos[j];
   } 
   if(!exists){
          var params = paramsTemplate;
      params["payload"] = {
         "text" : events[i].getTitle(), 
        "type" : "todo",
        "priority" : "1.5",
        "date" : events[i].getEndTime()
      }
     UrlFetchApp.fetch("https://habitica.com/api/v3/tasks/user", params)

   }
  }
 }
 
