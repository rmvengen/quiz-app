<h1>**Random Quiz App**</h1>

Choosing random Students to answer a set of questions

<p>This app was a practice to create a quiz that randomly selects students.</p>

<h3>How to use:</h3>
```
Click the Randomize! button for the program to randomly select a student from the students already listed in the program.
The program then randomly selects a student and a question
You can enter in the answer to the question and then it will tell you if you were correct or not
```
<h3>Code:</h3>
<p>This part of the code is the hardest to explain what is happening.
``` 
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
```
<p>As well as this part.. as well as trying to make the program count the number correct and wrong
```
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
```