import React, { Component } from 'react'
import Money from '../component/Money'
import Token from '../component/Token'
import Collection from '../component/Collection'
import {Col,Row} from 'react-bootstrap'
//import $ from 'jquery'
import Dictate from '../lib/dictate.js'
//import Dictate from '../lib/dictate.js'

export default class Start extends Component{

    

    render(){
        var tt = new window.Transcription();
        return(
            <div>
                {/* <Row>
                    <Col xs={1}>
                        <Token />
                    </Col>
                    <Col xs={1}>
                        <Money />
                    </Col>
                </Row>
                <Row>
                    <Collection />
                </Row> */}
                <link rel="stylesheet" type="text/css" href="css/demo.css"/>
                <span id="serverStatusBar" title="Number of available workers"></span>

                    <div className="controls">
                    <button
                        id="buttonStart"
                        onClick="startListening();"
                        title="Starts listening for speech, i.e. starts recording and transcribing.">Start</button>
                    <button
                        id="buttonStop"
                        onClick="stopListening();"
                        title="Stops listening for speech. Speech captured so far will be recognized as if the user had stopped speaking at this point. Note that in the default case, this does not need to be called, as the speech endpointer will automatically stop the recognizer listening when it determines speech has completed.">Stopp</button>
                    <button
                        id="buttonCancel"
                        onClick="cancel();"
                        title="Cancels the speech recognition.">Katkesta</button>
                    </div>

                    <textarea rows="8" cols="80" id="trans">
                    </textarea>

                    <div id="statusBar"></div>

                    <hr/>

                    <div className="controls">
                    <button
                        onClick="init();"
                        title="Request access to the microphone">Init</button>

                    <button
                        onClick="showConfig();"
                        title="Show the configuration of the Dictate object">Config</button>

                    <button
                        onClick="clearLog();"
                        title="Clear the log">Clear log</button>
                    </div>

                    <pre id="log">
                    </pre>
                

            </div>
        )
    }
}