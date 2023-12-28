import multer from 'multer';
const storage = multer.diskStorage({
    destination : (req, filem , cb) =>{
        cb(null , 'uploads/');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '-' + file.originalname)
    },
});

const upload = multer({storage: storage})

export default upload