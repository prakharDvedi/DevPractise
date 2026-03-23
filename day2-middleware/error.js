export default function(err,req,res,next){
    const payload = { message: "Something went wrong" }
    return res.status(500).json(payload);
}
