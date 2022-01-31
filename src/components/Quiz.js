import axios from "axios";
import React from "react";
import '../style/Quiz.css'

const data = {
    questions: [
        {   
            question: "L'homme le plus riche du monde",
            answers: [
                { 
                    ans: "Zuckemberg",
                    correct: '0'
                }
                ,{ 
                    ans: "Bezos",
                    correct: '0'
                },
                { 
                    ans: "Musk",
                    correct: '1'
                },
                { 
                    ans: "Gates",
                    correct: '0'
                }
            ]
        },
        {   
            question: "10+5",
            answers: [
                { 
                    ans: "17",
                    correct: '0'
                }
                ,{ 
                    ans: "15",
                    correct: '1'
                },
                { 
                    ans: "42",
                    correct: '0'
                },
                { 
                    ans: "8",
                    correct: '0'
                }
            ]
        },
        {   
            question: "La prémiere lettre de l'alphabet",
            answers: [
                { 
                    ans: "C",
                    correct: '0'
                }
                ,{ 
                    ans: "Z",
                    correct: '0'
                },
                { 
                    ans: "B",
                    correct: '0'
                },
                { 
                    ans: "A",
                    correct: '1'
                }
            ]
        }
    ]
};
/*var data={};
axios.get('/api.php')
    .then(function(response){
        data = response.data.questions;
        console.log(data);
    }); */
export default class Quiz extends React.Component{
    state = {
        points: 0,
        ans: 0,
        confirm: 0,
        notOver:0,
    }

    checkAnswer = (e) => {
        //check if any sibling element has been clicked already, and if they did just return nothing
        if(e.target.nextElementSibling !== null){ 
                if(e.target.nextElementSibling.answered =="true"){
                    return;
            }if(e.target.nextElementSibling.nextElementSibling !== null){ 
                if(e.target.nextElementSibling.nextElementSibling.answered =="true"){
                    return;
                }
                if(e.target.nextElementSibling.nextElementSibling.nextElementSibling !== null ){
                    if( e.target.nextElementSibling.nextElementSibling.nextElementSibling.answered =="true"){
                        return;
                    }
                }
            }
        }
        if(e.target.previousElementSibling !== null ){
            if( e.target.previousElementSibling.answered =="true"){
                return;
            }  
            if(e.target.previousElementSibling.previousElementSibling !== null ){
                if( e.target.previousElementSibling.previousElementSibling.answered =="true"){
                    return;
                }      
                if(e.target.previousElementSibling.previousElementSibling.previousElementSibling !== null ){
                    if( e.target.previousElementSibling.previousElementSibling.previousElementSibling.answered =="true"){
                        return;
                    }
                }
            }
        }
        //change color if clicked, store answer in tmpstyle and add point if correct
        if(e.target.value == '1' && e.target.answered != "true"){
            e.target.style = 'background-color: #23A0D6';
            e.target.tmpstyle = 'background-color: green';
            this.setState({points: this.state.points+1});
            e.target.answered = "true";
            this.setState({ans: this.state.ans+1})
        }else if(e.target.answered != "true"){
            e.target.style = 'background-color: #23A0D6';     
            e.target.tmpstyle = 'background-color: red';
            if(this.state.points <=0){
                this.setState({points: 0})
                e.target.answered = "true";
                this.setState({ans: this.state.ans+1})
            }else{
                e.target.answered = "true";
                this.setState({ans: this.state.ans+1})
            }
        } 
        // code to enable clicking again to cancel your choice
        else if(e.target.answered == 'true' && e.target.value == '1' && !this.state.confirm){
            e.target.style = '';
            e.target.tmpstyle = '';
            this.setState({points: this.state.points-1});
            e.target.answered = "false";
            this.setState({ans: this.state.ans-1})
        }else if(e.target.answered == 'true' && e.target.value == '0' && !this.state.confirm){
            e.target.style = '';
            e.target.tmpstyle = '';
            e.target.answered = "false";
            this.setState({ans: this.state.ans-1})
        }
    }
    //on confirm change all the answer style into their tempstyle temp style
    confirm = (e) =>{
        if (this.state.ans>=data.questions.length){
            this.setState({confirm: 1})
            var elements = document.getElementsByClassName("answers");
            for (var i = 0, len = elements.length; i < len; i++) {
                elements[i].style=elements[i].tmpstyle;
            }
        }else{
            this.setState({notOver: 1})
        }
    }
    refreshPage = () =>{
        window.location.reload(false);
      }
    render(){
            return(
                <div className="questions" >
                    {data.questions.map((question,j) => {
                        return(
                            <div  key={j}>
                                <p> 
                                    {j+1}) {question.question}
                                </p>
                                <ul className="answersGroup">
                                    {question.answers.map((answer, i) =>{
                                        return (
                                            <button className="answers" value={answer.correct} 
                                            answered="false" key={i} onClick={this.checkAnswer}>
                                                {answer.ans}
                                            </button>)
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                    {
                    this.state.ans >= data.questions.length && this.state.confirm==1 ?                 
                    <div>
                        <p>
                            GAME OVER
                        </p>
                        <p>
                            Vous avez obtenu {this.state.points} {this.state.points>=2 && 'points'} {this.state.points==0 && 'points'} {this.state.points==1 && 'point'} sur {data.questions.length}
                        </p>
                        <button className="refresh" onClick={this.refreshPage}>Réessayer</button>
                    </div>
                    :                
                    <div className="confirmContainer">
                        {this.state.notOver>=1 && 'Repondez a toutes les questions svp  '}
                        <button className="confirm" onClick={this.confirm}>Confirmer</button>
                    </div> 
                    }
                </div>
            );
        }
    }
