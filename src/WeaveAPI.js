


//createjs.Ticker.setFPS(50);
//createjs.Ticker.

// constructor:
	
	this.WeaveAPI = {}
    
    //Object.defineProperty(WeaveAPI, '_sessionManager', {
           // value: new SessionManager()
        //});
    //Object.defineProperty(WeaveAPI, '_stageUtils', {
            //value: new weave.core.StageUtils()
        //});
    
    Object.defineProperty(this.WeaveAPI, 'TASK_PRIORITY_IMMEDIATE', {
            value: 0
        });
    
    Object.defineProperty(this.WeaveAPI, 'TASK_PRIORITY_HIGH', {
            value: 1
        });
    
    Object.defineProperty(this.WeaveAPI, 'TASK_PRIORITY_NORMAL', {
            value: 2
        });
    
    Object.defineProperty(this.WeaveAPI, 'TASK_PRIORITY_LOW', {
            value: 3
        });
    
   
    WeaveAPI.SessionManager = new weavecore.SessionManager();

            

    
    


