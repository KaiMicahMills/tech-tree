import './tech-tree.scss';

/**
 * Longevity Tech Tree
 * Copyright 2021 Foresight Institute
 * @returns {JSX.Element}
 * @constructor
 */

const Tree = () => {

  /**
   * Temporary data
   * TODO: get from server
   */
  const tempData = [
    {
      title: 'K/P/Na/Ca',
      type: 'nutrition-inputs',
    },
    {
      title: 'Electrodynamics',
      type: 'core-technology',
    },
    {
      title: 'Epigenetics',
      type: 'core-technology',
    },
    {
      title: 'Gene Expression Control',
      type: 'core-technology',
      relations: ['Epigenetics', 'Electrodynamics'],
    },
    {
      title: 'Circadian Rhythm Control',
      type: 'core-technology',
      relations: ['Gene Expression Control', 'Testosterone'],
    },
    {
      title: 'Regeneration Cycles',
      type: 'longevity-tech',
      relations: ['Circadian Rhythm Control'],
    },
    {
      title: 'Insomnia Cure',
      type: 'general-improvement',
      relations: ['Circadian Rhythm Control'],
    },
    {
      title: 'Yamanaka Factors',
      type: 'core-technology',
    },
    {
      title: 'Dedifferentiation',
      type: 'core-technology',
      relations: ['Yamanaka Factors'],
    },
    {
      title: 'Senescence Control',
      type: 'core-technology',
      relations: ['Dedifferentiation', 'Senolytics'],
    },
    {
      title: 'Cure for Cancer',
      type: 'general-improvement',
      relations: ['Senescence Control', 'Telomere Control', 'Gene Repair Control', 'Gene Replacement Therapy'],
    },
    {
      title: 'Regeneration of Senescent Cells',
      type: 'longevity-tech',
      relations: ['Senescence Control'],
    },
    {
      title: 'Senolytics',
      type: 'core-technology',
    },
    {
      title: 'Telomere Control',
      type: 'core-technology',
    },
    {
      title: 'Gene Repair Control',
      type: 'core-technology',
    },
    {
      title: 'Gene Replacement Therapy',
      type: 'core-technology',
    },
  ];

  /**
   * Location Reference
   * Stores the absolute location of node elements for future usage
   * @type {[]}
   */
  let locRef = [];

  /**
   * Count of nodes without previous relations
   * @type {number}
   */
  let starterCount = 0;

  return (
    <div className="tree">
      <div className="header">
        <div className="header-block">
          <img src="/foresight.png" alt="Foresight Institute" />
          <h1>Longevity Tech Tree</h1>
          <h3>v0.1 last updated nov 24, 2021</h3>
          <br />
          <h4>
            <a
              href="https://fsnone-bb4c.kxcdn.com/wp-content/uploads/2021/10/Longevity-Technology.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View the full document
            </a>
          </h4>
          <h4>
            <a
              href="https://app.markup.io/invite/accept/t5KhhVoe"
              target="_blank"
              rel="noreferrer"
            >
              Provide feedback
            </a>
          </h4>
        </div>
        <div className="header-block">
          <h4>Key:</h4>
          <br />
          <div className="key blue">
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
        <div className="nodes">
          {
            tempData.map((node, index) => {
              /**
               * Set ID of node
               * @type {string}
               */
              const id = node.title.replace(/\s/g, '-').toLowerCase();
              /**
               * Position multiplier based on render index
               * @type {number}
               */
              const multiplier = starterCount + 1;
              /**
               * Default positioning
               * @type {number}
               */
              const pixelDiff = 65;
              const fontWidth = 8;
              let t = pixelDiff * multiplier;
              let l = pixelDiff * multiplier;
              /**
               * Check if node has any backwards relations
               */
              const startingPoints = [];
              if (node.relations && node.relations.length) {
                locRef.forEach((n) => {
                  if (n.id === node.relations[0].replace(/\s/g, '-').toLowerCase()) {
                    /**
                     * Find the top position of the backwards relation and match it
                     */
                    t = n.top;
                    l = n.left + ((n.id.length * fontWidth) + pixelDiff);
                  }

                  if (n.id !== node.relations[0].replace(/\s/g, '-').toLowerCase()) {
                    /**
                     * Check if a node is already in this position
                     */
                    if (n.top === t && n.left === l) {
                      t = t + pixelDiff;
                      starterCount = starterCount + 1;
                    }
                  }

                  /**
                   * Save relation starting points to draw lines later
                   */
                  node.relations.forEach((relation) => {
                    if (n.id === relation.replace(/\s/g, '-').toLowerCase()) {
                      startingPoints.push({
                        id: n.id,
                        top: n.top,
                        left: n.left,
                      });
                    }
                  })
                });
              } else {
                /**
                 * Node has no backwards relations
                 * @type {number}
                 */
                starterCount = starterCount + 1;
                l = 0;
              }
              /**
               * Position styling
               * @type {{top: number, left: number}}
               */
              const position = {
                top: t,
                left: l,
              };
              /**
               * Add node to location reference
               * @type {*[]}
               */
              const newLocRef = locRef;
              newLocRef.push({
                id: id,
                top: position.top,
                left: position.left,
              });
              locRef = newLocRef;
              /**
               * Render the node
               */
              return (
                <>
                  {
                    startingPoints.length ? (
                      <>
                        {
                          startingPoints.map((point) => {

                            const polylineLeft = position.left - (point.id.length * fontWidth);

                            return (
                              <svg style={{
                                top: position.top + 16, // center vertically
                                left: position.left - 50,
                              }}>
                                <polyline points={`0,0 ${polylineLeft},0`}
                                          fill="none" stroke="white" strokeWidth="4" />
                              </svg>
                            );
                          })
                        }
                      </>
                    ) : null
                  }
                  <div
                    className={`node ${node.type}`}
                    id={id}
                    style={position}
                  >
                    {node.title}
                  </div>
                </>
              );
            })
          }
        </div>
      </div>
      <div className="footer">
        <p>Copyright &copy; 2021 Foresight Institute, all rights reserved.</p>
      </div>
    </div>
  )
}

export default Tree;
