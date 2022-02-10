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
                            correct: '0'
                        },
                        { 
                            ans: "loading",
                            correct: '0'
                        }
                    ]
                }
            ]
        },
        started:0,
        choices: [],
        tochose: 0,
        create: 0,
        questionsnb: 1,
        questions: [{
            question: "question",
            answers: 
                [
                    { 
                        ans: "response 1",
                        correct: '0'
                    }
                    ,{ 
                        ans: "response 2",
                        correct: '0'
                    },
                    { 
                        ans: "response 3",
                        correct: '0'
                    },
                    { 
                        ans: "response 4",
                        correct: '0'
                    }
                ]}
            ],
        sample:{   
                question: "question",
                answers: 
                    [
                        { 
                            ans: "response 1",
                            correct: '0'
                        }
                        ,{ 
                            ans: "response 2",
                            correct: '0'
                        },
                        { 
                            ans: "response 3",
                            correct: '0'
                        },
                        { 
                            ans: "response 4",
                            correct: '0'
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
        axios.get(`http://localhost/list.php`)
        .then(res => {
            const list = res.data;
            this.setState({choices: list});
            this.setState({tochose: 1})
        })
    }

    chosen = (e) => {
        let tmpid = parseInt(e.target.id);
        axios.get(`http://localhost/api.php?id=`+tmpid)
        .then(res => {
          const tmpdata = JSON.parse(res.data.json);
          this.setState({data: tmpdata});
          this.setState({started: 1})
        })
    }
    
    tocreate = ()=>{
        this.setState({create: 1})
    }

    addquestion = () => {
        this.setState({questionsnb: this.state.questionsnb+1});
        let question = this.state.sample;
        this.state.questions.push(question)
        console.log(this.state.questions)
    }

    removequestion = () => {
        if(this.state.questionsnb>1){
            this.setState({questionsnb: this.state.questionsnb-1})
            this.state.questions.pop()
        }
    }
    /*createquiz =(e)=>{
        e.preventDefault()
        for(let i;i<=this.state.questions.length;i++){
            console.log(e.target)
        }
        console.log(e.target)
    }*/
    render(){
        if(this.state.create === 1){
            return(
                <div>
                    <p>
                        <button onClick={this.addquestion}>
                            Ajouter une question
                        </button>
                        <button onClick={this.removequestion}>
                            enlever une question
                        </button>
                    </p>
                    <form action="http://localhost/insert.php" method="post">
                    {
                        this.state.questions.map((question, i)=>{
                            return(
                                <div key={i}>
                                    <label for={"q"+i}>{question.question} {i+1}:  </label>
                                    <input type="text" id={"q"+i} name={"q"+i}></input>
                                    {
                                        question.answers.map((answer, j)=>{
                                            return(
                                                <div key={j}>
                                                    <label for={"q"+i+"ans"+j}>{answer.ans} : </label>
                                                    <input type="text" id={"q"+i+"ans"+j} name={"q"+i+"ans"+j}></input>
                                                    <label for={"q"+i+"ans"+j+"c"}>correct:</label>
                                                    <input type="hidden" id={"q"+i+"ans"+j+"c"} name={"q"+i+"ans"+j+"c"} value="incorrect"></input>
                                                    <input type="checkbox" id={"q"+i+"ans"+j+"c"} name={"q"+i+"ans"+j+"c"} value="correct"></input>
                                                </div>
                                            )
                                        })
                                    }
                                    <br/>
                                </div>
                            )
                        })
                    }
                    <input type="submit" value="Valider"></input>
                    </form>
                </div>
            )
        }
        else if(this.state.started === 1){
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
                                            </button>
                                            )
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
        } else{
            return(
                <div className="choice">
                    <p>Choisissez un Quiz ou <button className="create" onClick={this.tocreate}>crée un Quiz</button></p>
                    {   
                        this.state.choices.map((choice, l)=>{
                            return(
                                <div key={l} id={l} className="choices" onClick={this.chosen}>
                                    {choice}
                                </div>    
                            )
                        })
                    }
                </div>
            )
        }
    }
}