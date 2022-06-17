const routesOrder = {
    "GET": {

    },
    "POST": {

    },
    notFound: (req, res) => {
        let payload = {
          message: "File not found",
          code: 404
        }
        let payloadStr = JSON.stringify(payload);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(404);
    
        res.write(payloadStr);
        res.end("\n");
      }
}

export default routesOrder