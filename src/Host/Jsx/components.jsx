



export function HostModal(){
    function generateChannelID(length){
            const charStore ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let channelID = ' ';
            const charactersLength = charStore.length;
            for ( let i = 0; i < length; i++ ) {
                channelID += charStore.charAt(Math.floor(Math.random() * charactersLength));
            }
            return channelID;
            }    

    function generateCryptoChannelID(){
        const uuid = crypto.randomUUID();
        console.log(uuid); 
    }

    return <motion.div>

        </motion.div>
}