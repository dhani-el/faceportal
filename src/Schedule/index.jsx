
import { motion } from "framer-motion";
import Soon from "../assets/Soon.png";


export default function Schedule(){
    return <motion.div className="flex items-center justify-center w-screen h-screen p-12">
               <motion.img src={Soon} className="w-full h-auto landscape:h-[90%] landscape:w-auto" />
    </motion.div>
}