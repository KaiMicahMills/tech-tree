import './tech-tree.scss';
import Data from "./Data";

/**
 * Longevity Tech Tree
 * Copyright 2021 Foresight Institute
 * @returns {JSX.Element}
 * @constructor
 */

const Tree = () => {

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

  /**
   * Size of node + desired spacing
   * @type {number}
   */
  const pixelDiff = 100;

  return (
    <div className="tree">
      <div className="header">
        <div className="header-block">
          <img src="/foresight.png" alt="Foresight Institute" />
          <h1>Longevity Tech Tree</h1>
          <h3>Prototype v0.1 (Jan 8, 2022)</h3>
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
        </div>
      </div>
      <div className="sections">
        <div className="nodes">
          {
            Data.map((node, index) => {
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
              const fontWidth = 10;
              let t = pixelDiff * multiplier;
              let l = pixelDiff * multiplier;
              /**
               * Check if node has any backwards relations
               */
              const startingPoints = [];
              if (node.relations && node.relations.length) {
                let pushed = false;
                locRef.forEach((n) => {
                  /**
                   * Find the top position of the backwards relation and match it
                   */
                  if (n.id === node.relations[0].replace(/\s/g, '-').toLowerCase()) {
                    t = n.top;
                    l = n.left + ((n.id.length * fontWidth) + pixelDiff);
                  } else {
                    /**
                     * Check if a node is already in this position
                     */
                    if (n.top === t) {
                      t = t + pixelDiff;
                      if (n.left === l && !pushed) {
                        starterCount = starterCount + 1;
                        pushed = true;
                      }
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
               * Node height & caret height for dynamic connection positions
               * TODO: Get from refs of respective divs instead of hardcode
               * @type {number}
               */
              const caretHeight = 12;
              const nodeHeight = 47;
              /**
               * Reference for most recent dynamic connection `top` value
               * @type {number}
               */
              let caretRef = 0;
              let lineRef = 0;
              /**
               * Render the node
               */
              return (
                <div key={index}>
                  {
                    startingPoints.length ? (
                      <>
                        {
                          startingPoints.map((point, index) => {
                            /**
                             * Add height of caret to reference
                             * @type {number}
                             */
                            lineRef = lineRef + caretHeight;
                            /**
                             * Check if it's the first line
                             */
                            if (index === 0) {
                              /**
                               * Center lines vertically
                               * @type {number}
                               */
                              const verticalDiff = nodeHeight - (caretHeight * startingPoints.length);
                              lineRef = 0 + (verticalDiff / 2);
                            }
                            /**
                             * Lower the opacity for based on long node connection length
                             * @type {number}
                             */
                            let strokeOpacity = 1;
                            if (Math.abs(position.top) - Math.abs(point.top) > 200) strokeOpacity = 0.75;
                            if (Math.abs(position.top) - Math.abs(point.top) > 400) strokeOpacity = 0.5;
                            if (Math.abs(position.top) - Math.abs(point.top) > 600) strokeOpacity = 0.25;
                            /**
                             * Random number generator
                             * @param min
                             * @param max
                             * @returns {number}
                             */
                            const ranNumGen = (min, max) => {
                              return Math.floor(Math.random() * (max - min + 1) + min)
                            }
                            const ranX = ranNumGen(20, 80);
                            const ranY = lineRef;
                            /**
                             * Render node connections
                             */
                            return (
                              <svg key={point.id} style={{ marginTop: 7 }}>
                                <line x1={point.left} y1={point.top + ranY} x2={position.left - ranX} y2={point.top + ranY} strokeWidth="2" stroke="transparent" strokeOpacity={strokeOpacity}>
                                  <animate attributeName="x2" from={point.left} to={position.left - ranX} dur="2s" />
                                  <animate attributeName="y2" from={point.top + ranY} to={point.top + ranY} dur="2s" />
                                  <animate attributeName="stroke" from="transparent" to="white" dur="2s" fill="freeze" repeatCount="1" />
                                </line>
                                <line x1={position.left - ranX} y1={point.top + ranY} x2={position.left - ranX} y2={position.top + ranY} strokeWidth="2" stroke="transparent" strokeOpacity={strokeOpacity}>
                                  <animate attributeName="x2" from={position.left - ranX} to={position.left - ranX} begin="2s" dur="1s" />
                                  <animate attributeName="y2" from={point.top + ranY} to={position.top + ranY} begin="2s" dur="1s" />
                                  <animate attributeName="stroke" from="transparent" to="white" begin="2s" dur="0.1s" fill="freeze" repeatCount="1" />
                                </line>
                                <line x1={position.left - ranX} y1={position.top + ranY} x2={position.left} y2={position.top + ranY} strokeWidth="2" stroke="transparent" strokeOpacity={strokeOpacity}>
                                  <animate attributeName="x2" from={position.left - ranX} to={position.left} begin="3s" dur="0.5s" />
                                  <animate attributeName="y2" from={position.top + ranY} to={position.top + ranY} begin="3s" dur="0.5s" />
                                  <animate attributeName="stroke" from="transparent" to="white" begin="3s" dur="0.1s" fill="freeze" repeatCount="1" />
                                </line>
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
                    {
                      startingPoints.length ? startingPoints.map((point, index) => {
                        /**
                         * Add height of caret to reference
                         * @type {number}
                         */
                        caretRef = caretRef + caretHeight;
                        /**
                         * Check if it's the first caret
                         */
                        if (index === 0) {
                          /**
                           * Center carets vertically
                           * @type {number}
                           */
                          const verticalDiff = nodeHeight - (caretHeight * startingPoints.length);
                          caretRef = 0 + (verticalDiff / 2);
                        }
                        /**
                         * Render carets
                         */
                        return (
                          <i className="fa fa-caret-right" style={{ top: caretRef }}></i>
                        )
                      }) : null
                    }
                  </div>
                  {
                    index === Data.length - 1 && (
                      <div className="node-height" style={{ height: starterCount * (pixelDiff + 0.5) }}></div>
                    )
                  }
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="footer">
        <p>Copyright &copy; 2022 Foresight Institute, all rights reserved.</p>
      </div>
    </div>
  )
}

export default Tree;
