import React, { Component } from 'react';
import {FormControl,InputGroup,Button} from 'react-bootstrap'
import Dictate from  '../lib/dictate.js'

export default class Microphone extends Component {
    constructor(props){
        super(props)
        this.state = {
            recording:false
        }
    }
    
    componentDidMount () {
        console.log("Hello world from microphone");
        
        this.state.window = {};
        Dictate(this.state.window);
        
        var transcription = new this.state.window.Transcription();
        this.state.transcription = transcription;
        
        var worker = this.props.worker;
        console.log("WORKER",worker);
        var dictate = new this.state.window.Dictate({
            server : "ws://192.168.38.10:8080/client/ws/speech",
            serverStatus : "ws://192.168.38.10:8080/client/ws/status",
            recorderWorkerPath : worker,
            onReadyForSpeech : function() {
                console.log("READY FOR SPEECH");
            },
            onEndOfSpeech : function() {
                console.log("END FOR SPEECH");
            },
            onEndOfSession : function() {
                console.log("END OF SESSION");
            },
            onServerStatus : function(json) {
                //__serverStatus(json.num_workers_available + ':' + json.num_requests_processed);
                //console.log(json.num_workers_available + ':' + json.num_requests_processed)
                /*if (json.num_workers_available == 0) {
                    $("#buttonStart").prop("disabled", true);
                    $("#serverStatusBar").addClass("highlight");
                } else {
                    $("#buttonStart").prop("disabled", false);
                    $("#serverStatusBar").removeClass("highlight");
                }*/
            },
            onPartialResults : function(hypos) {
                // TODO: demo the case where there are more hypos
                transcription.add(hypos[0].transcript, false);
                let transcript = hypos[0].transcript.toString();
                console.log("Partial result ",transcript);
                if(transcript.indexOf("โกวาจี") != -1) {
                    this.setState({transcript: transcript.substr(transcript.indexOf("โกวาจี"))});
                }
                else {
                    this.setState({transcript: ""});
                }
                
                //__updateTranscript(tt.toString());
            }.bind(this),
            onResults : function(hypos) {
                // TODO: demo the case where there are more results
                transcription.add(hypos[0].transcript, true)
                /*for(let hypo of hypos) {
                    console.log("Hypo data ",hypo.transcript.toString(),hypo.likelihood)
                }*/
                console.log("Result: best transcript "+transcription.toString())
                let transcript = transcription.toString();
                if(transcript.indexOf("โกวาจี") != -1) {
                    // valid command
                    let cmd = transcript.substr(transcript.indexOf("โกวาจี"));
                    this.setState({transcript: cmd});
                    this.props.handleCommand(cmd);
                    console.log("CMD",cmd);
                }
                else {
                    this.setState({transcript: ""});
                }
                transcription.clear();
                //this.setState({transcript: transcription.toString()})
                
                //__updateTranscript();
                // diff() is defined only in diff.html
                /*if (typeof(diff) == "function") {
                    diff();
                }*/
            }.bind(this),
            onError : function(code, data) {
                //__error(code, data);
                //__status("Viga: " + code);
                console.log(code,data);
                dictate.cancel();
            },
            onEvent : function(code, data) {
                //console.log(code,data);
                //__message(code, data);
            }
        });
        this.state.dictate = dictate;
        this.state.dictate.init();
    }
    
    startRecord() {
        this.state.transcription.clear();
        this.state.dictate.startListening();
        
        this.setState({recording:true});
    }
    
    stopRecord() {
        this.state.dictate.stopListening();
        this.setState({recording:false});
    }
    
    render(){
        return(
            <div class="input-group my-3">
                <FormControl
                    type="text"
                    value={this.state.transcript}
                    placeholder="Enter text"
                />
                <div class="input-group-append">
                    <Button onClick={this.state.recording?this.stopRecord.bind(this):this.startRecord.bind(this)} >
                        {this.state.recording?'Stop':'Start'}
                    </Button>
                </div>
            </div>
        )
    }
}