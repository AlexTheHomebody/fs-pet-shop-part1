var fs = require('fs');
var command = process.argv[2];
var index = process.argv[3];

if(command===undefined){
    console.error("Usage: node pets.js [read | create | update | destroy]")
    process.exit(1);
}

if(command == 'read'){
    fs.readFile('pets.json', 'utf8',(err, data)=>{
        if (err){
            console.log('read error');
            process.exit(1);
        } else {
            if(index !== undefined){
                fs.readFile('pets.json', 'utf8',(err, data)=>{
                    if (err){
                        console.log('error');
                        process.exit(1);
                    } else if(JSON.parse(data)[index] === undefined) {
                        console.log('Usage: node pets.js read INDEX');
                        process.exit(1)
                    } else {
                        console.log(JSON.parse(data)[index]);
                    }
                })
            } else{
                console.log(JSON.parse(data));
            }
        }
    })
}else if(command == 'create'){
    fs.readFile('pets.json', 'utf8',(err, data)=>{
        if (err){
            console.log('create error');
            process.exit(1);
        }else {
            var age = parseInt(index);
            var kind = process.argv[4];
            var name = process.argv[5];
            var newPet = {age, kind, name};
            var parsedData = JSON.parse(data);
            parsedData.push(newPet);
            var petJSON = JSON.stringify(parsedData)
            if(!age || !kind || !name) {
                console.log('Usage: node pets.js create AGE KIND NAME')
            } else {
                fs.writeFile('pets.json', petJSON, (err)=>{
                    if(err){
                        console.log('Usage: node pets.js create AGE KIND NAME')
                        process.exit(1);
                    }
                })
            }
       }
     })
    
}else{
    console.log('user error');
}

