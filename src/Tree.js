import './tech-tree.scss';

const Tree = () => {

  return (
    <div className="tree">
      <div className="header">
        <div className="header-block">
          <img src="/foresight.png" alt="Foresight Institute" />
          <h1>Longevity Tech Tree</h1>
          <h3>v0.1 last updated nov 24, 2021</h3>
          <br />
          <h4>
            <a href="https://fsnone-bb4c.kxcdn.com/wp-content/uploads/2021/10/Longevity-Technology.pdf" target="_blank" rel="noreferrer">View the full document</a>
          </h4>
          <h4>
            <a href="https://app.markup.io/invite/accept/t5KhhVoe" target="_blank" rel="noreferrer">Provide feedback</a>
          </h4>
        </div>
        <div className="header-block">
          <h4>Key:</h4>
          <br />
          <div class="key blue">
            Core Technology
          </div>
          <div className="key purple">
            Longevity Tech
          </div>
          <div className="key yellow">
            General Improvement
          </div>
          <div className="key green">
            Nutrition Inputs
          </div>
        </div>
      </div>
      <div className="sections">
        <section className="reprogramming">
          <h2>Reprogramming</h2>
        </section>
        <section className="organic-replacement">
          <h2>Organic Replacement</h2>
        </section>
        <section className="slowing-time">
          <h2>Slowing Time</h2>
        </section>
        <section className="synthetic-replacement">
          <h2>Synthetic Replacement</h2>
        </section>
        <section className="damage-control">
          <h2>Damage Control</h2>
        </section>
      </div>
      <div className="footer">
        <p>Copyright &copy; 2021 Foresight Institute, all rights reserved.</p>
      </div>
    </div>
  )
}

export default Tree;
