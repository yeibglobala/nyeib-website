import React from "react";

export function SimpleFirstStepSection() {
  return (
    <section className="apply-sec apply-first">
      <div className="max-w-[1240px] w-full mx-auto px-5 sm:px-8 lg:px-12">
        <h2>A simple first step.</h2>
        <div className="apply-facts">
          <div className="apply-fact">
            <svg viewBox="-.1 -.1 8.3 17.4" aria-hidden="true">
              <use href="#L" fill="url(#gm)" />
            </svg>
            <p>
              The initial application or partnership form is designed to take
              approximately five minutes.
            </p>
          </div>
          <div className="apply-fact">
            <svg viewBox="5.8 -.1 7.9 17.4" aria-hidden="true">
              <use href="#C" fill="url(#gp)" />
            </svg>
            <p>
              You only need to provide the information required for initial
              screening. If your submission progresses, the NYEIB team may request
              additional details or supporting documents.
            </p>
          </div>
          <div className="apply-fact">
            <svg viewBox="11.4 -.1 8.4 17.4" aria-hidden="true">
              <use href="#R" fill="url(#go)" />
            </svg>
            <p>
              <b>There is no application fee.</b> NYEIB does not work through
              paid agents or intermediaries who charge applicants for access.
            </p>
          </div>
        </div>

        <div className="apply-band">
          <b>Every application is considered through the relevant review process.</b>
          <span>
            Submitting a business application or partnership enquiry does not
            guarantee funding, investment, grant support or an institutional
            partnership.
          </span>
          <span>
            All opportunities remain subject to applicable eligibility
            requirements, screening, assessment and approval processes.
          </span>
        </div>
      </div>
    </section>
  );
}
