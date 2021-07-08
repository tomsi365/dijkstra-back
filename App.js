const express = require('express')
const cors = require('cors')
let Heap = require("collections/heap");
const app=express();


app.listen('8080',()=>{})

app.use(express.json());
app.use(cors())

app.post('/', (request, response,next)=>{
    let myJson = request.body;// your JSON
    let res=Dijkstra(myJson.table,myJson.source)
    response.send(res);	 // echo the result back
});

function Dijkstra(graph,source)
{
    let d=[graph.length]
    let p=[graph.length]

    let heap=new Heap(null,
        (a, b)=> {
            return b.key === a.key
        },
        (a, b)=> {
        return b.value - a.value
        }
    );

    for(let v=0;v<graph.length;v++){
        d[v]=1000 //assumed 1000 is like infinity
        p[v]=-1 //assumed -1 is undefined
        heap.push({key:v,value:d[v]})
    }

    d[source]=0

    while(heap.length!=0){
        console.log(heap)
        let node=heap.pop()
        let u=node.key;

        for(let v=0;v<graph.length;v++){
            if(parseInt(graph[u][v])>0){
                let alt=parseInt(d[u])+parseInt(graph[u][v])
                if(alt<parseInt(d[v])){
                    heap.delete({key:v,value:d[v]})
                    d[v]=alt
                    p[v]=u
                    heap.push({key:v,value:d[v]})
                }
            }
        }
    }

    return {
        p:p,
        d:d
    }
}


