import React, { Component } from 'react';
import Dictate from  '../lib/dictate.js'

export default class Microphone extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: 10
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
            server : "ws://192.168.1.46:8080/client/ws/speech",
            serverStatus : "ws://192.168.1.46:8080/client/ws/status",
            recorderWorkerPath : worker,
            onReadyForSpeech : function() {
                console.log("READY FOR SPEECH");
                //__message("READY FOR SPEECH");
                //__status("Kuulan ja transkribeerin...");
            },
            onEndOfSpeech : function() {
                console.log("END FOR SPEECH");
                //__message("END OF SPEECH");
                //__status("Transkribeerin...");
            },
            onEndOfSession : function() {
                console.log("END OF SESSION");
                //__message("END OF SESSION");
                //__status("");
            },
            onServerStatus : function(json) {
                //__serverStatus(json.num_workers_available + ':' + json.num_requests_processed);
                console.log(json.num_workers_available + ':' + json.num_requests_processed)
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
                //__updateTranscript(tt.toString());
            },
            onResults : function(hypos) {
                // TODO: demo the case where there are more results
                transcription.add(hypos[0].transcript, true);
                
                console.log(transcription.toString())
                
                //__updateTranscript();
                // diff() is defined only in diff.html
                /*if (typeof(diff) == "function") {
                    diff();
                }*/
            },
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
        
        console.log(this.state);
    }
    
    startRecord() {
        console.log(this.state.dictate);
        this.state.dictate.startListening();
    }
    
    stopRecord() {
        this.state.dictate.stopListening();
        console.log(this.state.transcription);
    }
    
    render(){
        return(
            <div>
                <button onClick={this.startRecord.bind(this)}>Start recording</button>
                <button onClick={this.stopRecord.bind(this)}>Stop recording</button>
            </div>
        )
    }
}