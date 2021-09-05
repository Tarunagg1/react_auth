

export const validateAccess = (myaccess,id) => {
    const isexist = myaccess.filter(ele => ele._id === id);
    if(myaccess.length > 0) {
        if(isexist.length > 0) {
            return true;
        }else{
            return false;
        }
    }
}

