export const TEST_ACTION = "TEST_ACTION";

export const testAction = () => {

  
    return  () => {

    }

}




export const deleteContribution =()=>{

    return (dispatch)=>{

        const jsonProjectUpdate = {
            message:'successfully deleted a contribution',
            updatedProject: {
                
                    projectId:2, 
                    contributors:[],
                    totalContributions:0
                
            }
        }

        return jsonProjectUpdate.updatedProject; 

    }
}