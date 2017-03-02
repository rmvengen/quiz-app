var quizModule = angular.module("quiz_app", []);

quizModule.controller("MainController", ['$scope', 'LocalStorageService', '$timeout',
                                         '$http',
                        function($scope, LocalStorageService, $timeout, $http){
        var mc = this;
        
      	mc.students = [
		{
			name: "Mickey Mouse",
			numberCorrect: 0,
			numberOfQuestions: 0
		},
		{
			name: "Minnie Mouse",
			numberCorrect: 0,
			numberOfQuestions: 0
		},
		{
			name: "Donald Duck",
			numberCorrect: 0,
			numberOfQuestions: 0
		},
		{
			name: "Daisy Duck",
			numberCorrect: 0,
			numberOfQuestions: 0
		},
		{
			name: "Pluto Mouse",
			numberCorrect: 0,
			numberOfQuestions: 0
		}
	];
        mc.studentName = "";
        mc.question = "";
        mc.answer = "";
        mc.showstudents = false;
        mc.showquestions = false;
        mc.answerChoice = "";
        mc.message = "Display will be here:";
        mc.showMessage = false;
        
        $http.get("questions.txt")
            .then(function(response){
                mc.message = response.data;
                mc.questionArray = mc.message.questions;
                
            });
        
        mc.checkAnswer = function(){
            if(mc.answerChoice == mc.randomQuestion.answerText){
                mc.randomStudent.numberCorrect++;
                mc.message = "You got it right!";
            }else{
                mc.message = "Sorry, that was wrong.";
                mc.randomStudent.numberCorrect =+ 0;
            }
            mc.showMessage = true;
            mc.randomStudent.numberOfQuestions++;
            
            mc.editStudents(mc.randomStudent);
        };
        mc.editStudents = function($index){
            
            
            var newStudent = {name: mc.randomStudent.name,
                              numberCorrect: mc.randomStudent.numberCorrect,
                              numberQuestions: mc.randomStudent.numberOfQuestions
            };
            for(var i = 0; i < mc.students.length; i++){
                if(mc.randomStudent.name == mc.students[i].name){
                    mc.students.splice($index, 1, newStudent);
                    mc.students[0].name="Answer!"
                    
                }
            }
       
            return LocalStorageService.setData('student-storage', 
                                    angular.toJson(mc.students));
            
        };
        
        mc.hideStudents = function(){
            mc.showstudents = false;
        }
        
        mc.showStudents = function(){
            mc.showstudents = true;
        }  
        
        mc.showQuestions = function(){
            mc.showquestions = true;
        }
        
        mc.hideQuestions = function(){
            mc.showquestions = false;
        }
            
        mc.updatedStudent = function(){
            return LocalStorageService.getData('student-storage');
        }
        
        mc.studentUpdate = function(sName, numberCorrect, numberQuestions){
            if(mc.students == null){
                mc.students = [];
            }
            
            var student = {name: sName, numberCorrect: numberCorrect, numberOfQuestions: numberQuestions};
            
            
            mc.students.push(student);
            return LocalStorageService.setData('student-storage', angular.toJson(mc.students));
        }
        
        mc.removeStudent = function($index){
            mc.students = mc.updatedStudent();
            mc.students.splice($index, 1);
            return LocalStorageService.setData('student-storage', angular.toJson(mc.students));
        }
      
      mc.updateArray = function(){
            for (var i in mc.students){
                if(mc.students[i].name == mc.randomStudent.name){
                    mc.students[i].numberOfQuestions
                if(mc.answerChoice == mc.randomQuestion.answerText){
                    mc.students[i].numberCorrect++
                    }
                    break;
                }
            }
        }
        mc.chooseStudent = function(){
             mc.randomStudent = mc.students[Math.floor(Math.random() * 
                                mc.students.length)];
        }
        
        mc.chooseQuestion = function(){
            mc.randomQuestion = mc.questionArray[Math.floor(Math.random()*
                                mc.questionArray.length)];
            //$timeout( function(){ $scope.callAtTimeout(); }, 3000);
            $timeout(function(){mc.chooseAnswer(); }, 1000);
            
        }
        
        mc.chooseAnswer = function(){
            mc.randomAnswer = mc.randomQuestion.answerText;
            
        }
        
        mc.start = function(){
            
            mc.chooseStudent();
            mc.chooseQuestion();
        }
        
        
        
                            
}]);

quizModule.factory("LocalStorageService", function($window, $rootScope){
    
    angular.element($window).on('storage', function($window, $rootScope){
        if(event.key === 'student-storage'){
            $rootScope.$apply();
        }
        if(event.key === 'question-storage'){
            $rootScope.$apply();
        }
    })
    
    return {
        setData: function(key, val){
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key){
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data;
        }
    }
})