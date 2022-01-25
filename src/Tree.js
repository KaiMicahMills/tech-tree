import './tech-tree.scss';
import Data from "./Data";
import { useEffect, useRef, useState } from "react";
import { Base64 } from "js-base64";
import Config from "./Config";

/**
 * Tech Tree
 * Copyright 2022 Foresight Institute
 * @returns {JSX.Element}
 * @constructor
 */

const Tree = () => {
  /**
   * Load Octokit for Github integration
   */
  const { Octokit } = require("@octokit/core");
  const { createPullRequest } = require("octokit-plugin-create-pull-request");
  /**
   * Template for new nodes
   * @type {{title: string, type: string}}
   */
  const NodeTemplate = {
    title: 'Node',
    type: Config.key[0].title.replace(' ', '-').toLowerCase(),
  }
  /**
   * Key colors from config for
   * dynamic node coloring
   */
  const [keyColors, setKeyColors] = useState({});
  useEffect(() => {
    let colors = {};
    Config.key.forEach((k) => {
      colors[k.title.replace(' ', '-').toLowerCase()] = k.color;
    });
    setKeyColors(colors);
  }, []);
  /**
   * Inner node page states
   */
  const [nodeInfoOpen, setNodeInfoOpen] = useState(true);
  const [nodeInfo, setNodeInfo] = useState(null);
  /**
   * Edit mode state
   */
  const [editMode, setEditMode] = useState(false);
  /**
   * Check if user made any changes
   */
  const [madeChanges, setMadeChanges] = useState(false);
  /**
   * Node that's currently being edited or created
   */
  const [editingNode, setEditingNode] = useState(null);
  /**
   * Check if the edited node is new or not
   */
  const [isNewNode, setIsNewNode] = useState(false);
  /**
   * Reference of inputs for editing or creating nodes
   */
  const inputRef = useRef();
  const relationsRef = useRef();
  const selectRef = useRef();
  /**
   * Tree data fetched from the original data file,
   * then saved as a state to modify later
   */
  const [treeData, setTreeData] = useState(Data.length ? Data : [NodeTemplate]);
  /**
   * Function to clean up relations
   *
   * For example, if you add a relation to a node that appears
   * after said node, the relation won't connect automatically.
   * This function moves that node to the correct position so
   * that it appears after each of its relations.
   *
   * TODO: this is temporary & slow, shouldn't need it
   */
  const Cleanup = (tree) => {
    /**
     * Store all references for node lookup
     * @type {*[]}
     */
    let refData = [];
    tree.map((node) => refData.push(node.title));
    /**
     * Store current mapped references
     * @type {*[]}
     */
    let saveData = [];
    /**
     * Search for invalid forwards relations
     */
    let cleanedData = tree;
    tree.forEach((node) => {
      saveData.push(node.title);
      let newLoc = 0;
      if (node.relations && node.relations.length && node.relations[0] !== '') {
        node.relations.forEach((relation) => {
          if (!saveData.includes(relation)) {
            /**
             * Check if relation is invalid
             */
            if (!refData.includes(relation)) return;
            /**
             * New location should be after furthest relation down the tree
             */
            if (refData.indexOf(relation) > newLoc) newLoc = refData.indexOf(relation);
            /**
             * Move node to new location and update reference & saved data list
             */
            saveData = saveData.filter((n) => n !== node.title);
            saveData.splice(newLoc, 0, node.title);
            refData = refData.filter((n) => n !== node.title);
            refData.splice(newLoc, 0, node.title);
            cleanedData = cleanedData.filter((n) => n.title !== node.title);
            cleanedData.splice(newLoc, 0, node);
          }
        });
      }
    });
    /**
     * Return re-ordered data
     */
    return cleanedData;
  };
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
  /**
   * Submission user details
   * TODO: refs maybe? state change is a bit laggy when typing (bc re-rendering tree)
   */
  const [submitName, setSubmitName] = useState(null);
  const [submitEmail, setSubmitEmail] = useState(null);
  /**
   * Loading & submission states
   */
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  /**
   * Submit changes to Github
   * @returns {Promise<void>}
   */
  const submitChanges = () => {
    setLoading(true);
    /**
     * Pull request Octokit plugin
     */
    const MyOctokit = Octokit.plugin(createPullRequest);
    /**
     * Authenticate with Github using access token
     * Needs to be a personal access token with repo permissions
     * @type {string}
     */
    const TOKEN = Config.github_token;
    const octokit = new MyOctokit({
      auth: TOKEN,
    });
    /**
     * Open a pull request with tree data changes
     * Encode tree state and replace Data.js file
     */
    octokit
      .createPullRequest({
        owner: Config.github_repo_owner,
        repo: Config.github_repo_name,
        title: `Tech Tree Changes from ${submitName}`,
        body: `Submitted from ${submitEmail}`,
        base: Config.github_base_branch,
        head: `tree-change/${submitName.replace(' ', '-').toLowerCase()}-${new Date().getTime()}`,
        changes: [
          {
            files: {
              "src/Data.js": {
                content: Base64.encode(`const Data = ${JSON.stringify(treeData, undefined, 2)};\n\nexport default Data;`),
                encoding: "base64",
              },
            },
            commit:
              `Tech tree changes from ${submitName}`,
          },
        ],
      })
      .then(() => {
        /**
         * Submission successful
         */
        setSubmitted(true);
        setLoading(false);
      }).catch((err) => {
        /**
         * Submission failed
         */
        setLoading(false);
        console.error(err);
        alert(err);
    });
  };

  /**
   * Render tree
   */
  return (
    <>
      {
        nodeInfoOpen && nodeInfo && !editMode && (
          <div className="overlay success">
            <div className="node-info" style={{ backgroundColor: Config.tree_background_color }}>
              <span onClick={() => setNodeInfoOpen(false)}>
                <i className="fa fa-long-arrow-alt-left"></i>
                Back
              </span>
              <h1>{nodeInfo.title}</h1>
              <br />
              {nodeInfo.description && <p>{nodeInfo.description}</p>}
              <p>Coming soon: List of companies/labs working on this problem, ways to get involved/donate/invest, and comments.</p>
            </div>
          </div>
        )
      }
      <div className={`tree ${editMode ? 'editing' : 'viewing'}`}>
        <div
          className="header"
          style={{
            background: 'url(' + Config.cover_image_url + ') no-repeat center center',
            backgroundSize: 'cover',
          }}
        >
          <div className="header-block">
            <img src="/foresight.png" alt="Foresight Institute" />
            <h1>{Config.title}</h1>
            <h3>{Config.subtitle}</h3>
          </div>
          <div className="header-block">
            <h4>Key:</h4>
            <br />
            {
              Config.key.map((k) => {
                return (
                  <div className="key" style={{ backgroundColor: k.color }} key={k.title}>
                    {k.title}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="sections" style={{ backgroundColor: Config.tree_background_color }}>
          <div className="edit-cover">
            {
              editMode && madeChanges && (
                <div className="submit-cover">
                  <input type="text" id="name" placeholder="Name" onChange={(e) => setSubmitName(e.target.value)}></input>
                  <input type="email" id="email" placeholder="Email" onChange={(e) => setSubmitEmail(e.target.value)}></input>
                  <div className={`submit ${(loading || !submitName || !submitEmail) ? 'disabled' : ''}`} onClick={() => submitChanges()}>
                    {
                      loading
                        ? <>Loading...</>
                        : <>Submit <i className="fa fa-check"/></>
                    }
                  </div>
                </div>
              )
            }
            <div className="edit" onClick={() =>  {
              setEditMode(!editMode);
              setNodeInfoOpen(false);
            }}>
              <p>{editMode ? <>View Mode</> : <>Edit Mode</>}</p>
              { editMode ? <i className="fa fa-eye" /> : <i className="fa fa-network-wired" /> }
            </div>
          </div>
          <div className="nodes">
            {
              treeData.map((node, index) => {
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
                let relList = '';
                if (node.relations && node.relations.length && node.relations[0] !== '') {
                  /**
                   * Build string for edit mode from relations list
                   */
                  relList = node.relations.join(', ');
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
                                lineRef = verticalDiff / 2;
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
                               * Horizontal and vertical line positioning
                               * @type {number}
                               */
                              const ranX = lineRef + 35;
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
                      className={`node ${node.type} ${editingNode === id ? 'top' : ''}`}
                      id={id}
                      style={{
                        top: position.top,
                        left: position.left,
                        backgroundColor: keyColors[node.type],
                      }}
                      onClick={() => {
                        setNodeInfo(node);
                        setNodeInfoOpen(true);
                      }}
                    >
                      {
                        editMode ? (
                          <>
                            {
                              editingNode === id ? (
                                <div className="edit-inputs">
                                  <label htmlFor="title">Title:</label>
                                  <input id="title" type="text" defaultValue={node.title} ref={editingNode === id ? inputRef : null} />
                                  <label htmlFor="relations">Dependencies (separate by commas):</label>
                                  <input id="relations" type="text" defaultValue={relList} ref={editingNode === id ? relationsRef : null} />
                                  <label htmlFor="type">Type:</label>
                                  <select id="type" ref={editingNode === id ? selectRef : null} defaultValue={node.type}>
                                    {
                                      Config.key.map((k) =>
                                        <option value={k.title.replace(' ', '-').toLowerCase()} key={k.title}>{k.title}</option>)
                                    }
                                  </select>
                                </div>
                              ) : (
                                <>{node.title}</>
                              )
                            }
                          </>
                        ) : (
                          <>{node.title}</>
                        )
                      }
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
                            caretRef = verticalDiff / 2;
                          }
                          /**
                           * Render carets
                           * TODO: match caret opacity to line opacity?
                           */
                          return (
                            <i className="fa fa-caret-right caret" style={{ top: caretRef }} key={index} />
                          )
                        }) : null
                      }
                      {
                        editMode && (
                          <div className="edit-icons">
                            {
                              editingNode === id ? (
                                <>
                                  <i className="fa fa-check" title="Save" onClick={() => {
                                    /**
                                     * Add modified node to data structure
                                     */
                                    setMadeChanges(true);
                                    setEditingNode(null);
                                    /**
                                     * Find node location
                                     */
                                    let treeLoc = null;
                                    /**
                                     * Store tree data temporarily
                                     * @type {{}}
                                     */
                                    let d = treeData;
                                    /**
                                     * Update relations, if any, if edit changes name
                                     */
                                    d.forEach((n, i) => {
                                      if (n.relations && n.relations.length) {
                                        /**
                                         * Search to see if there are any
                                         * backwards relation matches
                                         */
                                        n.relations.forEach((r, ii) => {
                                          if (r === node.title) {
                                            /**
                                             * There's a match, let's replace it
                                             */
                                            d[i].relations.splice(ii, 1);
                                            d[i].relations.splice(ii, 0, inputRef.current.value);
                                          }
                                        })
                                      }
                                      if (n.title === node.title) {
                                        /**
                                         * Save node location for later
                                         */
                                        treeLoc = i;
                                      }
                                    });
                                    /**
                                     * Remove previous node
                                     */
                                    d = d.filter((n) => n.title !== node.title);
                                    setTreeData(d);
                                    /**
                                     * Build new node
                                     */
                                    let newNode = NodeTemplate;
                                    newNode.title = inputRef.current.value.trim();
                                    newNode.type = selectRef.current.value.replace(' ', '-').toLowerCase();
                                    newNode.relations = relationsRef.current.value.split(',').map((r) => r.trim());
                                    /**
                                     * Add node to correct location,
                                     */
                                    let tempData = d;
                                    tempData.splice(treeLoc, 0, newNode);
                                    setTreeData(Cleanup(tempData));
                                    setIsNewNode(false);
                                  }} />
                                  <i className="fa fa-ban" title="Cancel" onClick={() => {
                                    /**
                                     * If cancelling new node
                                     */
                                    if (isNewNode) {
                                      setTreeData(treeData.filter((n) => n.title.replace(/\s/g, '-').toLowerCase() !== editingNode));
                                    }
                                    /**
                                     * Cancel
                                     */
                                    setIsNewNode(false);
                                    setEditingNode(null);
                                  }} />
                                </>
                              ) : (
                                <>
                                  <i className="fa fa-plus" title="Add Child Node" onClick={() => {
                                    setEditingNode(null);
                                    setIsNewNode(true);
                                    /**
                                     * Creating new node
                                     * @type {{}}
                                     */
                                    let d = treeData;
                                    let treeLoc = null;
                                    /**
                                     * Find current node location, save for later
                                     */
                                    d.forEach((n, i) => {
                                      if (n.title === node.title) {
                                        treeLoc = i;
                                      } else if (n.title === `Node ${treeLoc + 1}`) {
                                        /**
                                         * If there are unmodified new nodes already,
                                         * continue creating unique names
                                         */
                                        treeLoc++;
                                      }
                                    });
                                    /**
                                     * Place new node after the current node
                                     */
                                    let newNode = NodeTemplate;
                                    newNode.title = `Node ${treeLoc + 1}`
                                    newNode.type = NodeTemplate.type;
                                    newNode.relations = [`${node.title}`];
                                    d.splice(treeLoc + 1, 0, newNode);
                                    setEditingNode(newNode.title.replace(/\s/g, '-').toLowerCase());
                                    setTreeData(d);
                                  }} />
                                  {
                                    !node.relations || !node.relations.length || node.relations[0] === '' ? (
                                      <i className="fa fa-sort-amount-down" title="Insert Base Node Below" onClick={() => {
                                        /**
                                         * TODO: fix duplicate code fragment
                                         */
                                        setEditingNode(null);
                                        setIsNewNode(true);
                                        /**
                                         * Inserting new base node
                                         * @type {{}}
                                         */
                                        let d = treeData;
                                        let treeLoc = null;
                                        /**
                                         * Find current node location, save for later
                                         */
                                        d.forEach((n, i) => {
                                          if (n.title === node.title) {
                                            treeLoc = i;
                                          } else if (n.title === `Node ${treeLoc + 1}`) {
                                            /**
                                             * If there are unmodified new nodes already,
                                             * continue creating unique names
                                             */
                                            treeLoc++;
                                          }
                                        });
                                        /**
                                         * Place new node after the current node
                                         */
                                        let newNode = NodeTemplate;
                                        newNode.title = `Node ${treeLoc + 1}`
                                        newNode.type = NodeTemplate.type;
                                        newNode.relations = [];
                                        d.splice(treeLoc + 1, 0, newNode);
                                        setEditingNode(newNode.title.replace(/\s/g, '-').toLowerCase());
                                        setTreeData(d);
                                      }} />
                                    ) : null
                                  }
                                  <i className="fa fa-pencil" title="Edit Node" onClick={() => setEditingNode(id)} />
                                  {
                                    treeData.length > 1 && (
                                      <i className="fa fa-trash" title="Delete Node" onClick={() => {
                                        /**
                                         * Remove node from data structure
                                         */
                                        setMadeChanges(true);
                                        setTreeData(treeData.filter((n) => n.title !== node.title));
                                      }} />
                                    )
                                  }
                                </>
                              )
                            }
                          </div>
                        )
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>
          <div className="node-height" style={{ height: (starterCount + 1) * pixelDiff, minHeight: 500 }}></div>
        </div>
        <div className="footer">
          <p>Copyright &copy; 2022 Foresight Institute, all rights reserved.</p>
        </div>
      </div>
      {
        submitted && (
          <div className="success">
            <h1>Submission successful!</h1>
            <div className="success-buttons">
              <a href={`https://github.com/${Config.github_repo_owner}/${Config.github_repo_name}/pulls`} rel="noreferrer" target="_blank">
                <button>View Pull Request</button>
              </a>
              <button onClick={() => setSubmitted(false)}>Return to Tree</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Tree;
