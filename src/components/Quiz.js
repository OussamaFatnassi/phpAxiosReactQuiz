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
        notOver:0
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
        //add or remove point if they haven't been clicked based on if they are correct or not
        if(e.target.value == '1' && e.target.answered != "true"){
            e.target.style = 'background-color: green';
            this.setState({points: this.state.points+1});
            e.target.answered = "true";
            this.setState({ans: this.state.ans+1})
        }else if(e.target.answered != "true"){     
            e.target.style = 'background-color: red';
            if(this.state.points <=0){
                this.setState({points: 0})
                e.target.answered = "true";
                this.setState({ans: this.state.ans+1})
            }else{
                this.setState({points: this.state.points-1});
                e.target.answered = "true";
                this.setState({ans: this.state.ans+1})
            }
        } 
        // code to enable clicking again to cancel your choice
        /*else if(e.target.answered == 'true' && e.target.value == '1'){
            e.target.style = 'background-color: white';
            this.setState({points: this.state.points-1});
            e.target.answered = "false";
            this.setState({ans: this.state.ans-1})
        }else if(e.target.answered == 'true' && e.target.value == '0'){
            e.target.style = 'background-color: white';
            this.setState({points: this.state.points+1});
            e.target.answered = "false";
            this.setState({ans: this.state.ans-1})
        }*/
    }
    //confirm button
    /*confirm = (e) =>{
        if (this.state.ans>=data.questions.length){
            this.setState({confirm: 1})
        }else{
            this.setState({notOver: 1})
        }
    }*/

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
                                        <button className="answers" style={{ backgroundColor: "white"}} value={answer.correct} 
                                        answered="false" key={i} onClick={this.checkAnswer}>
                                            {answer.ans}
                                        </button>)
                                })}
                            </ul>
                        </div>
                    );
                })}
                {
                    //uncomment and remove && to add a confirm button
                this.state.ans >= data.questions.length && //this.state.confirm==1 && ?                 
                <div>
                    <p>
                        GAME OVER
                    </p>
                    <p>
                        Vous avez obtenu {this.state.points} {this.state.points>2 && 'points'} {this.state.points==0 && 'points'} {this.state.points==1 && 'point'} sur {data.questions.length}
                    </p>
                </div> 
                /*:                
                <div className="confirmContainer">
                    {this.state.notOver>=1 && 'Repondez a toutes les questions svp  '}
                    <button className="confirm"onClick={this.confirm}>Confirmer</button>
                </div> */
                }
                
                {/* uncomment to add a points counter
                <p className="points">{this.state.points}</p>*/
                }
            </div>
        );
    }
} 