import axios from "axios";
import React from "react";
import '../style/Quiz.css';
import Gameover from "./Gameover";
export default class Quiz extends React.Component{
    state = {
        points: 0,
        ans: 0,
        confirm: 0,
        notOver:0,
        data: {
            questions: [
                {   
                    question: "loading",
                    answers: [
                        { 
                            ans: "loading",
                            correct: '0'
                        }
                        ,{ 
                            ans: "loading",
                            correct: '0'
                        },
                        { 
                            ans: "loading",
                            correct: '1'
                        },
                        { 
                            ans: "loading",
                            correct: '0'
                        }
                    ]
                }
            ]
        }
    }

    checkAnswer = (e) => {
        //check if any sibling element has been clicked already, and if they did just return nothing
        if(e.target.nextElementSibling !== null){ 
                if(e.target.nextElementSibling.answered ==="true"){
                    return;
            }if(e.target.nextElementSibling.nextElementSibling !== null){ 
                if(e.target.nextElementSibling.nextElementSibling.answered ==="true"){
                    return;
                }
                if(e.target.nextElementSibling.nextElementSibling.nextElementSibling !== null ){
                    if( e.target.nextElementSibling.nextElementSibling.nextElementSibling.answered ==="true"){
                        return;
                    }
                }
            }
        }
        if(e.target.previousElementSibling !== null ){
            if( e.target.previousElementSibling.answered ==="true"){
                return;
            }  
            if(e.target.previousElementSibling.previousElementSibling !== null ){
                if( e.target.previousElementSibling.previousElementSibling.answered ==="true"){
                    return;
                }      
                if(e.target.previousElementSibling.previousElementSibling.previousElementSibling !== null ){
                    if( e.target.previousElementSibling.previousElementSibling.previousElementSibling.answered ==="true"){
                        return;
                    }
                }
            }
        }
        //change color if clicked, store answer in tmpstyle and add point if correct
        if(e.target.value === '1' && e.target.answered !== "true"){
            e.target.style = 'background-color: #23A0D6';
            e.target.tmpstyle = 'background-color: green';
            this.setState({points: this.state.points+1});
            e.target.answered = "true";
            this.setState({ans: this.state.ans+1})
        }else if(e.target.answered !== "true"){
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
        else if(e.target.answered === 'true' && e.target.value === '1' && !this.state.confirm){
            e.target.style = '';
            e.target.tmpstyle = '';
            this.setState({points: this.state.points-1});
            e.target.answered = "false";
            this.setState({ans: this.state.ans-1})
        }else if(e.target.answered === 'true' && e.target.value === '0' && !this.state.confirm){
            e.target.style = '';
            e.target.tmpstyle = '';
            e.target.answered = "false";
            this.setState({ans: this.state.ans-1})
        }
    }
    //on confirm change all the answer style into their tempstyle temp style
    confirm = (e) =>{
        if (this.state.ans>=this.state.data.questions.length){
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
    //refresh state after getting the questions from the api
    componentDidMount() {
        axios.get(`http://localhost/api.php`)
          .then(res => {
            const tmp = JSON.parse(res.data);
            this.setState({data: tmp});
          })
      }  
    render(){
            return(
                <div className="questions" >
                    {this.state.data.questions.map((question,j) => {
                        return(
                            <div  key={j}>
                                <p> 
                                    {j+1}) {question.question}
                                </p>
                                <ul className="answersGroup">
                                    {question.answers.map((answer, i) =>{
                                        return (
                                            <button className="answers" value={answer.correct} 
                                            answered="false" key={i} onClick={this.checkAnswer} 
                                            style={{backgroundColor: answer.correct>=1 && this.state.confirm===1 ? 'green' : ''}}>
                                                {answer.ans} 
                                            </button>)
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                    {
                    this.state.ans >= this.state.data.questions.length && this.state.confirm===1 ?                 
                    <div>
                        <Gameover></Gameover>
                        <p>
                            Vous avez obtenu {this.state.points} {this.state.points>=2 && 'points'} {this.state.points===0 && 'points'} {this.state.points=== 'point'} sur {this.state.data.questions.length}
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