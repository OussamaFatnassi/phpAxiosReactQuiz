import axios from "axios";
import React from "react";
import "../style/Quiz.css";
import Gameover from "./Gameover";
export default class Quiz extends React.Component {
  state = {
    choiceMade:0,
    points: 0,
    ans: 0,
    confirm: 0,
    notOver: 0,
    ids: [],
    id:0,
    data: {
      questions: [
        {
          question: "loading",
          answers: [
            {
              ans: "loading",
              correct: "0",
            },
            {
              ans: "loading",
              correct: "0",
            },
            {
              ans: "loading",
              correct: "0",
            },
            {
              ans: "loading",
              correct: "0",
            },
          ],
        },
        {
          question: "loading",
          answers: [
            {
              ans: "loading",
              correct: "0",
            },
            {
              ans: "loading",
              correct: "0",
            },
            {
              ans: "loading",
              correct: "0",
            },
            {
              ans: "loading",
              correct: "0",
            },
          ],
        },
      ],
    },
    started: 0,
    choices: [],
    tochose: 0,
    create: 0,
    questionsnb: 1,
    questions: [
      {
        question: "question",
        answers: [
          {
            ans: "response 1",
            correct: "0",
          },
          {
            ans: "response 2",
            correct: "0",
          },
          {
            ans: "response 3",
            correct: "0",
          },
          {
            ans: "response 4",
            correct: "0",
          },
        ],
      },
    ],
    sample: {
      question: "question",
      answers: [
        {
          ans: "response 1",
          correct: "0",
        },
        {
          ans: "response 2",
          correct: "0",
        },
        {
          ans: "response 3",
          correct: "0",
        },
        {
          ans: "response 4",
          correct: "0",
        },
      ],
    },
    help: 1,
    logged: 0,
    status:"",
  };
  checkNextSiblings = (e) => {
    if (e.nextElementSibling !== null) {
      if (
        e.nextElementSibling.answered === "true" ||
        this.checkNextSiblings(e.nextElementSibling)
      ) {
        return true;
      }
    }
  };

  checkPreviousSiblings = (e) => {
    if (e.previousElementSibling !== null) {
      if (
        e.previousElementSibling.answered === "true" ||
        this.checkPreviousSiblings(e.previousElementSibling)
      ) {
        return true;
      }
    }
  };

  checkAnswer = (e) => {
    //check if any sibling element has been clicked already, and if they did just return nothing
    if (
      this.checkNextSiblings(e.target) ||
      this.checkPreviousSiblings(e.target)
    ) {
      return;
    }
    //change color if clicked, store answer in tmpstyle and add point if correct
    if (e.target.value === "1" && e.target.answered !== "true") {
      e.target.style = "background-color: #23A0D6";
      e.target.tmpstyle = "background-color: green";
      this.setState({ points: this.state.points + 1 });
      e.target.answered = "true";
      this.setState({ ans: this.state.ans + 1 });
    } else if (e.target.answered !== "true") {
      e.target.style = "background-color: #23A0D6";
      e.target.tmpstyle = "background-color: red";
      if (this.state.points <= 0) {
        this.setState({ points: 0 });
        e.target.answered = "true";
        this.setState({ ans: this.state.ans + 1 });
      } else {
        e.target.answered = "true";
        this.setState({ ans: this.state.ans + 1 });
      }
    }
    // code to enable clicking again to cancel your choice
    else if (
      e.target.answered === "true" &&
      e.target.value === "1" &&
      !this.state.confirm
    ) {
      e.target.style = "";
      e.target.tmpstyle = "";
      this.setState({ points: this.state.points - 1 });
      e.target.answered = "false";
      this.setState({ ans: this.state.ans - 1 });
    } else if (
      e.target.answered === "true" &&
      e.target.value === "0" &&
      !this.state.confirm
    ) {
      e.target.style = "";
      e.target.tmpstyle = "";
      e.target.answered = "false";
      this.setState({ ans: this.state.ans - 1 });
    }
  };

  checkLogin = () => {};
  //on confirm change all the answer style into their tempstyle temp style
  confirm = (e) => {
    if (this.state.ans >= this.state.data.questions.length) {
      let score = Math.floor( this.state.points/this.state.data.questions.length*100);
      this.setState({ confirm: 1 });
      var elements = document.getElementsByClassName("answers");
      for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].style = elements[i].tmpstyle;
      }
      if(this.state.logged===1){
        axios
            .get(`localhost/score.php?id=` + localStorage.getItem('id') + `&score=`+score+`&quiz=`+this.state.choiceMade)
            .then((res) => {
              const tmpdata = res.data;
              console.log(tmpdata);
            });

      }else{
        console.log("You have to log in to save your score" );
      }
    } else {
      this.setState({ notOver: 1 });
    }
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  //refresh state after getting the questions from the api
  componentDidMount() {
    if(localStorage.getItem("logged")==="1"){
      this.setState({logged:1});
      this.setState({status:"Deja connecté"});
    }
    if (localStorage.getItem("tocreate") == 1) {
      this.setState({ logged: 1, create: 1 });
      localStorage.setItem("tocreate", 0);
    }
    axios.get(`localhost/list.php`).then((res) => {
      const list = res.data;
      this.setState({ choices: list });
      axios.get(`localhost/id.php`).then((res2) => {
        const ids = res2.data;
        this.setState({ ids: ids });
        this.setState({ tochose: 1 });
      });
    });
  }

  chosen = (e) => {
    let tmpid = e.target.getAttribute("idq");
    this.setState({ choiceMade: tmpid });
    axios
      .get(`localhost/api.php?id=` + tmpid)
      .then((res) => {
        const tmpdata = res.data;
        this.setState({ data: tmpdata });
        this.setState({ started: 1 });
      });
  };

  tocreate = () => {
    this.setState({ create: 1 });
    if (localStorage.getItem("logged") === "1") {
      this.setState({ logged: 1 });
    }
  };
  setHelp = () => {
    this.setState({ help: 0 });
  };

  addquestion = () => {
    this.setState({ questionsnb: this.state.questionsnb + 1 });
    let question = this.state.sample;
    this.state.questions.push(question);
  };

  removequestion = () => {
    if (this.state.questionsnb > 1) {
      this.setState({ questionsnb: this.state.questionsnb - 1 });
      this.state.questions.pop();
    }
  };

  login = () => {
    let pseudo = document.getElementById('pseudo').value;
    if(pseudo){
      axios.get(`localhost/login.php?pseudo=` + pseudo).then((res) => {
        const tmp = res.data;
        console.log(res.data)
        if(tmp){
          this.setState({ logged: 1 });
          this.setState({id:tmp});
          localStorage.setItem("logged", 1);
          localStorage.setItem("id", tmp);
          this.setState({status:"Vous êtes connecté"})
        }else{
          this.setState({status: "Pseudo incorrect"})
        }
      });
    }
  }
  confirmquiz = () => {
    let newquestions = document.getElementsByClassName("newquestion");
    let newanswers = document.getElementsByClassName("newanswer");
    let newcorrect = document.getElementsByClassName("newcorrect");
    let newquiz = [];
    let tmpanswers = [];
    let i = 0;
    Array.from(newquestions).forEach((quest) => {
      Array.from(newanswers).forEach((ans) => {
        if (ans.getAttribute("idquest") === quest.getAttribute("idquest")) {
          let tmpans = {};
          tmpans.ans = ans.value;
          Array.from(newcorrect).forEach((cor) => {
            if (ans.getAttribute("idans") === cor.getAttribute("idans")) {
              if (cor.checked) {
                tmpans.correct = "1";
              } else {
                tmpans.correct = "0";
              }
            }
          });
          tmpanswers.push(tmpans);
        }
      });
      let tmpobject = { question: quest.value, answers: tmpanswers };
      tmpanswers = [];
      newquiz[i] = tmpobject;
      tmpobject = {};
      i++;
    });
    let newq = { questions: newquiz };
    newq = JSON.stringify(newq);
    let newname = document.getElementById("nomnewquiz").value;

    axios.post(
      "localhost/add.php",
      {
        name: newname,
        quiz: newq,
      },
      {
        "Access-Control-Allow-Origin": "*",
      }
    );
  };
  render() {
    if (this.state.create === 1) {
      return (
        <div>
          <p>
            <button className="refresh" onClick={this.addquestion}>
              Ajouter une question
            </button>{" "}
            <button className="refresh" onClick={this.removequestion}>
              enlever une question
            </button>
          </p>
          <div>
            Titre Quiz
            <input id="nomnewquiz" className="nomclass" type="text" />
          </div>
          <div>
            {this.state.questions.map((question, i) => {
              let idq = i.toString() + "question";
              return (
                <div key={i}>
                  <div className="newquestionlabel">
                    {question.question} {i + 1}:
                    <input idquest={idq} className="newquestion" type="text" />
                  </div>
                  {question.answers.map((answer, j) => {
                    let b = i.toString() + "q" + j.toString() + "ans";
                    return (
                      <div key={j}>
                        <div className="newlabel">
                          {answer.ans} :
                          <input
                            idans={b}
                            idquest={idq}
                            className="newanswer"
                            type="text"
                          />
                        </div>
                        <div className="newlabel">
                          correct:
                          <input
                            idans={b}
                            idquest={idq}
                            className="newcorrect"
                            type="checkbox"
                          />
                        </div>
                      </div>
                    );
                  })}
                  <br />
                </div>
              );
            })}
            <button className="refresh" onClick={this.confirmquiz}>
              Valider
            </button>
          </div>
          <button className="refresh" onClick={this.refreshPage}>
            Back
          </button>
        </div>
      );
    } else if (this.state.started === 1) {
      return (
        <div className="questions">
          {this.state.data.questions.map((question, j) => {
            return (
              <div key={j}>
                <p>
                  {j + 1}) {question.question}
                </p>
                <ul className="answersGroup">
                  {question.answers.map((answer, i) => {
                    return (
                      <button
                        className="answers"
                        value={answer.correct}
                        answered="false"
                        key={i}
                        onClick={this.checkAnswer}
                        style={{
                          backgroundColor:
                            answer.correct >= 1 && this.state.confirm === 1
                              ? "green"
                              : "",
                        }}
                      >
                        {answer.ans}
                      </button>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          {this.state.ans >= this.state.data.questions.length &&
          this.state.confirm === 1 ? (
            <div>
              <Gameover></Gameover>
              <p>
                Vous avez obtenu {this.state.points}{" "}
                {this.state.points >= 2 && "points"}{" "}
                {this.state.points === 0 && "points"}{" "}
                {this.state.points === "point"} sur{" "}
                {this.state.data.questions.length}
              </p>
              <button className="refresh" onClick={this.refreshPage}>
                Réessayer
              </button>
            </div>
          ) : (
            <div className="confirmContainer">
              {this.state.notOver >= 1 &&
                "Repondez a toutes les questions svp  "}
              <button className="confirm" onClick={this.confirm}>
                Confirmer
              </button>
            </div>
          )}
        </div>
      );
    } else if(this.state.logged===0) {
      return (
        <div className="choice">
          <input type={"text"} id='pseudo' placeholder='Pseudo'></input>
          <button onClick={this.login}>
            LogIn
          </button>
          {this.state.status}
          <p>
            Choisissez un Quiz ou{" "}
            <button className="refresh" onClick={this.tocreate}>
              crée un Quiz
            </button>
          </p>
          {this.state.choices.map((choice, l) => {
            return (
              <div
                key={l}
                id={l}
                idq={this.state.ids[l]}
                className="choices"
                onClick={this.chosen}
              >
                {choice}
              </div>
            );
          })}
        </div>
      )}else{
        return (
          <div className="choice">
            {this.state.status}
            <p>
              Choisissez un Quiz ou{" "}
              <button className="refresh" onClick={this.tocreate}>
                crée un Quiz
              </button>
            </p>
            {this.state.choices.map((choice, l) => {
              return (
                <div
                  key={l}
                  id={l}
                  idq={this.state.ids[l]}
                  className="choices"
                  onClick={this.chosen}
                >
                  {choice}
                </div>
              );
            })}
          </div>
        );
      }
    }
  }
