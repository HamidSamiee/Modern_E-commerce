

const Container = (Props) => {
    console.log(Props)
  return (
    <section className={Props.class1}>
        <div className="container xl:max-w-screen-xl ">
            {
                Props.children
            }
        </div>
    </section>
  )
}

export default Container