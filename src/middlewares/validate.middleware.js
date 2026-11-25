export const validate = (schema) => (req, res, next) => {
    // safeParse não lança o erro: devolve { success, data } ou { success, error }
    const result = schema.safeParse(req.body);

    if(!result.success) {

        return res.status(400).json(
            {
                errors: result.error.issues.map((i) => ({
                    campo: i.path.join('.'),
                    mensagem: i.message
                }))
            }
        )

    };

    req.body = result.data;
    next();

}