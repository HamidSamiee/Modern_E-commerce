import { Helmet } from "react-helmet"

const Meta = (Props) => {

    const {title}=Props;

  return (
    <Helmet>
                <meta charSet="utf-8" lang="fa"/>
                <title>{title}</title>
                
    </Helmet>
  )
}

export default Meta