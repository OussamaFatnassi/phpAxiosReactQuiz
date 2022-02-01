import react from "react";
import "../style/Gameover.css"
export default class Gameover extends react.Component{
    render(){
        return(
            <div className="burrito">
            <div className="t-line"></div>
            <div className="middot"></div>
            <div className="entree">
                    <div className="letter-row">
                            <div className="g">
                                    <div className="g-long"></div>
                                    <div className="g-stump"></div>
                                    <div className="g-mid"></div>
                                    <div className="g-empty"></div>
                                    <div className="g-long"></div>
                            </div>

                            <div className="a">
                                    <div className="a-top"></div>
                                    <div className="a-hoe"></div>
                                    <div className="a-top"></div>
                                    <div className="a-hoe"></div>
                                    <div className="a-hoe"></div>
                            </div>

                            <div className="m">
                                    <div className="m-hoe"></div>
                                    <div className="m-doge"></div>
                                    <div className="m-flex">
                                            <div className="mph-1"></div>
                                            <div className="mph-2"></div>
                                    </div>
                                    <div className="m-hoe"></div>
                                    <div className="m-hoe"></div>
                            </div>

                            <div className="e">
                                    <div className="e-long"></div>
                                    <div className="e-short"></div>
                                    <div className="e-long"></div>
                                    <div className="e-short"></div>
                                    <div className="e-long"></div>
                            </div>
                    </div>


                    <div className="letter-row">
                            <div className="o"></div>
                            <div className="v">
                                    <div className="v-sides"></div>
                                    <div className="v-dip"></div>
                                    <div className="v-bot"></div>
                            </div>

                            <div className="e">
                                    <div className="e-long"></div>
                                    <div className="e-short"></div>
                                    <div className="e-long"></div>
                                    <div className="e-short"></div>
                                    <div className="e-long"></div>
                            </div>

                            <div className="r">
                                    <div className="r-full"></div>
                                    <div className="reee"></div>
                                    <div className="r-full"></div>
                                    <div className="r-leg"></div>
                                    <div className="r-foot"></div>
                            </div>
                    </div>
            </div>

            <div className="middot"></div>
            <div className="t-line"></div>
        </div>
        )
    }
}