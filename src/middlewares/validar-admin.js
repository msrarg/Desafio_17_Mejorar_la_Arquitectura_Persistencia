const validarAdministrador = (req = requiere, res = response, next) => {
    const path   = req.originalUrl;
    const method = req.method;
    if (process.env.ADMINISTRADOR !== true){
        return res.status(401).json({
            error: -1,
            descripcion:`ruta ${path} y/o método ${method} no autorizada`
        });
    }
    next();
}

module.exports = {
    validarAdministrador
};
