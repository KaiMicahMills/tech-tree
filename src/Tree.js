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
    {
      title: 'Senescence Control',
      type: 'core-technology',
      relations: ['Dedifferentiation', 'Senolytics'],
    },
    {
      title: 'Regeneration of Senescent Cells',
      type: 'longevity-tech',
      relations: ['Senescence Control'],
    },
    {
      title: 'Cure for Cancer',
      type: 'general-improvement',
      relations: ['Senescence Control', 'Telomere Control', 'Gene Repair Control', 'Gene Replacement Therapy'],
    },
    {
      title: 'Molecule Replacement',
      type: 'core-technology',
    },
    {
      title: 'Hormone Replacement',
      type: 'core-technology',
      relations: ['Molecule Replacement'],
    },
    {
      title: 'Klotho',
      type: 'core-technology',
      relations: ['Hormone Replacement'],
    },
    {
      title: 'General Regeneration?',
      type: 'longevity-tech',
      relations: ['Klotho'],
    },
    {
      title: 'Testosterone',
      type: 'core-technology',
      relations: ['Hormone Replacement', 'Circadian Rhythm Control'],
    },
    {
      title: 'Estrogens',
      type: 'core-technology',
      relations: ['Hormone Replacement'],
    },
    {
      title: 'Menopause Therapy',
      type: 'general-improvement',
      relations: ['Estrogens'],
    },
    {
      title: 'Human Growth Hormone',
      type: 'core-technology',
      relations: ['Hormone Replacement'],
    },
    {
      title: 'Thymus Regeneration',
      type: 'core-technology',
      relations: ['Human Growth Hormone'],
    },
    {
      title: 'Immune System Regeneration',
      type: 'longevity-tech',
      relations: ['Thymus Regeneration'],
    },
    {
      title: 'Cell Replacement',
      type: 'core-technology',
      relations: ['Molecule Replacement'],
    },
    {
      title: 'Microbiome Control',
      type: 'core-technology',
      relations: ['Cell Replacement'],
    },
    {
      title: 'Gut Disorder Cures',
      type: 'general-improvement',
      relations: ['Microbiome Control'],
    },
    {
      title: 'Stem Cell Therapy',
      type: 'core-technology',
      relations: ['Cell Replacement'],
    },
    {
      title: 'Diabetes Cure',
      type: 'general-improvement',
      relations: ['Stem Cell Therapy'],
    },
    {
      title: 'Cartilage Regeneration',
      type: 'general-improvement',
      relations: ['Stem Cell Therapy'],
    },
    {
      title: 'Platelet Rich Plasma',
      type: 'core-technology',
      relations: ['Cell Replacement'],
    },
    {
      title: 'Menopause Reversal',
      type: 'longevity-tech',
      relations: ['Platelet Rich Plasma'],
    },
    {
      title: 'Lab Grown Blood',
      type: 'core-technology',
      relations: ['Cell Replacement'],
    },
    {
      title: 'Blood Donations Solved',
      type: 'general-improvement',
      relations: ['Lab Grown Blood'],
    },
    {
      title: 'Tissue Replacement',
      type: 'core-technology',
      relations: ['Cell Replacement'],
    },
    {
      title: 'Extracellular Matrix Reconstruction',
      type: 'core-technology',
      relations: ['Tissue Replacement'],
    },
    {
      title: 'Pneumonia Cure',
      type: 'general-improvement',
      relations: ['Extracellular Matrix Reconstruction'],
    },
    {
      title: 'Skin Renewal',
      type: 'general-improvement',
      relations: ['Extracellular Matrix Reconstruction'],
    },
    {
      title: 'Brain Replacement',
      type: 'core-technology',
      relations: ['Tissue Replacement'],
    },
    {
      title: 'Stroke Cure',
      type: 'general-improvement',
      relations: ['Brain Replacement'],
    },
    {
      title: 'Dementia Cure',
      type: 'general-improvement',
      relations: ['Brain Replacement'],
    },
    {
      title: 'Body on a Chip',
      type: 'core-technology',
      relations: ['Tissue Replacement'],
    },
    {
      title: 'Drug development',
      type: 'general-improvement',
      relations: ['Body on a chip'],
    },
    {
      title: '3d Bioprinting',
      type: 'core-technology',
    },
    {
      title: 'Organ Scaffolds',
      type: 'core-technology',
    },
    {
      title: 'Head Transplant',
      type: 'core-technology',
    },
    {
      title: 'Brain Transplant',
      type: 'core-technology',
    },
    {
      title: 'Organ Replacement',
      type: 'core-technology',
      relations: ['Tissue Replacement', '3d Bioprinting', 'Organ Scaffolds'],
    },
    {
      title: 'Organ Transplant Waitlist Solved',
      type: 'general-improvement',
      relations: ['Organ Replacement'],
    },
    {
      title: 'Body Replacement',
      type: 'longevity-tech',
      relations: ['Organ Replacement', 'Head Transplant', 'Brain Transplant'],
    },
    {
      title: 'Frozen Cells',
      type: 'core-technology',
    },
    {
      title: 'Frozen Stem Cells',
      type: 'core-technology',
      relations: ['Frozen Cells', 'Stem Cell Therapy']
    },
    {
      title: 'Frozen Blood',
      type: 'core-technology',
      relations: ['Frozen Cells']
    },
    {
      title: 'Blood Storage',
      type: 'core-technology',
      relations: ['Frozen Blood']
    },
    {
      title: 'Blood Donations Solved',
      type: 'general-improvement',
      relations: ['Blood Storage', 'Lab Grown Blood']
    },
    {
      title: 'Parabiosis / Blood Dilution',
      type: 'longevity-tech',
      relations: ['Blood Storage']
    },
    {
      title: 'Frozen Tissue',
      type: 'core-technology',
      relations: ['Frozen Cells']
    },
    {
      title: 'Surgical Improvements',
      type: 'general-improvement',
      relations: ['Frozen Tissue']
    },
    {
      title: 'Vitrified Organs',
      type: 'core-technology',
      relations: ['Frozen Tissue']
    },
    {
      title: 'Organ Storage',
      type: 'core-technology',
      relations: ['Vitrified Organs', 'Organ Transplant Waitlist Solved']
    },
    {
      title: 'Vitrified Body',
      type: 'core-technology',
      relations: ['Vitrified Organs']
    },
    {
      title: 'Long Distance Space Travel',
      type: 'general-improvement',
      relations: ['Vitrified Body']
    },
    {
      title: 'Cryonic Revival',
      type: 'longevity-tech',
      relations: ['Vitrified Body']
    },
    {
      title: 'Brain Preservation',
      type: 'core-technology',
      relations: ['Vitrified Organs', 'Brain Transplant']
    },
    {
      title: 'Brain Machine Interface',
      type: 'core-technology',
    },
    {
      title: 'Mind Uploading',
      type: 'core-technology',
      relations: ['Brain Machine Interface', 'Brain Preservation']
    },
    {
      title: 'Cybernetic Brain',
      type: 'core-technology',
      relations: ['Mind Uploading']
    },
    {
      title: 'Artificial Muscle',
      type: 'core-technology',
    },
    {
      title: 'Lifelike Prosthetics',
      type: 'general-improvement',
      relations: ['Brain Machine Interface', 'Artificial Muscle']
    },
    {
      title: 'ATP to Electricity',
      type: 'core-technology',
    },
    {
      title: 'Artificial Organs',
      type: 'core-technology',
      relations: ['ATP to Electricity']
    },
    {
      title: 'Cure Heart Disease',
      type: 'general-improvement',
      relations: ['Artificial Organs']
    },
    {
      title: 'Cure Kidney Failure',
      type: 'general-improvement',
      relations: ['Artificial Organs']
    },
    {
      title: 'Electricity to ATP',
      type: 'general-improvement',
      relations: ['ATP to Electricity']
    },
    {
      title: 'Cybernetic Body',
      type: 'core-technology',
      relations: ['Artificial Organs', 'Artificial Muscle']
    },
    {
      title: 'Cyborg',
      type: 'longevity-tech',
      relations: ['Cybernetic Body', 'Electricity to ATP']
    },
    {
      title: 'Android',
      type: 'longevity-tech',
      relations: ['Cyborg', 'Cybernetic Brain']
    },
    {
      title: 'Food From Energy',
      type: 'general-improvement',
      relations: ['Electricity to ATP']
    },
    {
      title: 'Heat Shock Response Control',
      type: 'core-technology',
    },
    {
      title: 'Refolding Proteins',
      type: 'core-technology',
      relations: ['Heat Shock Response Control']
    },
    {
      title: 'Proteolysis Control',
      type: 'core-technology',
    },
    {
      title: 'PROTACS',
      type: 'core-technology',
    },
    {
      title: 'Recycling Individual Proteins',
      type: 'core-technology',
      relations: ['Refolding Proteins', 'Proteolysis Control', 'PROTACS']
    },
    {
      title: 'Measure Autophagy in Vivo',
      type: 'core-technology',
    },
    {
      title: 'Caloric Restriction',
      type: 'core-technology',
    },
    {
      title: 'mTOR/AMPk',
      type: 'core-technology',
    },
    {
      title: 'Autophagy Control',
      type: 'core-technology',
      relations: ['Measure Autophagy in Vivo', 'Caloric Restriction', 'mTOR/AMPk']
    },
    {
      title: 'Recycling Many Proteins',
      type: 'core-technology',
      relations: ['Recycling Individual Proteins', 'Autophagy Control']
    },
    {
      title: 'Extracellular Matrix Turnover',
      type: 'core-technology',
      relations: ['Recycling Many Proteins', 'Tissue Replacement']
    },
    {
      title: 'Glymphatic System Control',
      type: 'core-technology',
    },
    {
      title: 'Complete Detritus Removal',
      type: 'longevity-tech',
      relations: ['Glymphatic System Control', 'Recycling Many Proteins']
    },
    {
      title: 'Removal of Eye Floaters',
      type: 'general-improvement',
      relations: ['Recycling Many Proteins']
    },
    {
      title: 'Alzheimers Cure',
      type: 'general-improvement',
      relations: ['Recycling Many Proteins']
    },
    {
      title: 'Lipofuscin Degradation',
      type: 'core-technology',
      relations: ['Recycling Many Proteins']
    },
    {
      title: 'Macular Degeneration Reversal',
      type: 'general-improvement',
      relations: ['Lipfuscin Degradation']
    },
    {
      title: 'Sarcopenia Cure',
      type: 'general-improvement',
      relations: ['Recycling Many Proteins']
    },
    {
      title: 'Muscular Dystrophy Cure',
      type: 'general-improvement',
      relations: ['Recycling Many Proteins']
    },
    {
      title: 'Reactive Oxygen Species',
      type: 'core-technology',
    },
    {
      title: 'Oxidated Lipids',
      type: 'core-technology',
    },
    {
      title: 'Advanced Glycation Endproduct Removal',
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

  /**
   * Size of node + desired spacing
   * @type {number}
   */
  const pixelDiff = 65;

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
        </div>
      </div>
      <div className="sections">
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
              const fontWidth = 11;
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
               * Render the node
               */
              return (
                <div key={index}>
                  {
                    startingPoints.length ? (
                      <>
                        {
                          startingPoints.map((point) => {
                            /**
                             * Lower the opacity for *very* long node connections
                             * @type {number}
                             */
                            let strokeOpacity = 1;
                            if (Math.abs(position.top) - Math.abs(point.top) > 400) {
                              strokeOpacity = 0.25;
                            }
                            /**
                             * Render node connections
                             */
                            return (
                              <svg key={point.id}>
                                <line x1={point.left} y1={point.top + 16} x2={position.left - 15} y2={point.top + 16} strokeWidth="2" stroke="transparent" strokeOpacity={strokeOpacity}>
                                  <animate attributeName="x2" from={point.left} to={position.left - 15} dur="2s" />
                                  <animate attributeName="y2" from={point.top + 16} to={point.top + 16} dur="2s" />
                                  <animate attributeName="stroke" from="transparent" to="white" dur="2s" fill="freeze" repeatCount="1" />
                                </line>
                                <line x1={position.left - 15} y1={point.top + 16} x2={position.left - 15} y2={position.top + 16} strokeWidth="2" stroke="transparent" strokeOpacity={strokeOpacity}>
                                  <animate attributeName="x2" from={position.left - 15} to={position.left - 15} begin="2s" dur="1s" />
                                  <animate attributeName="y2" from={point.top + 16} to={position.top + 16} begin="2s" dur="1s" />
                                  <animate attributeName="stroke" from="transparent" to="white" begin="2s" dur="0.1s" fill="freeze" repeatCount="1" />
                                </line>
                                <line x1={position.left - 15} y1={position.top + 16} x2={position.left} y2={position.top + 16} strokeWidth="2" stroke="transparent" strokeOpacity={strokeOpacity}>
                                  <animate attributeName="x2" from={position.left - 15} to={position.left} begin="3s" dur="0.5s" />
                                  <animate attributeName="y2" from={position.top + 16} to={position.top + 16} begin="3s" dur="0.5s" />
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
                      startingPoints.length ? (
                        <i className="fa fa-caret-right"></i>
                      ) : null
                    }
                  </div>
                  {
                    index === tempData.length - 1 && (
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
        <p>Copyright &copy; 2021 Foresight Institute, all rights reserved.</p>
      </div>
    </div>
  )
}

export default Tree;
