import css from 'css'

export default async function handler (req, res) {
    const {body} = req;

    if (req.method === "POST") {
        try {
            const parsedCss = css.parse(body)
            return res.status(200).send(parsedCss)
        } catch (error) {
            res.status(400).json({
                error: error
            })
        }
      } else {
        return res.status(200).json({
            message: "This is not a post",
          });
        }
}