import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "@reach/router";
import ToolBar from "./ToolBar";
import Tab from "./Tab";
import Mails from "./Mails";
import usePagination from "../hooks/pagination";
import useMails from "../hooks/mails";
import usePageSelection from "../hooks/pageSelection";

const PAGE_SIZE = 50;
const TABS = ["primary", "social", "promotions"];

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Tabs = styled.div`
  flex: 0 0 50px;
`;

const Scrollable = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
`;

const Mailbox = ({ folder }) => {
  const [currentTab, setCurrentTab] = useState(TABS[0]);
  const mails = useMails(folder, currentTab);
  const [start, end, nextPage, prevPage] = usePagination(
    PAGE_SIZE,
    mails.length
  );
  const currentPage = mails.slice(start, end);
  const [allSelected, toggleAll] = usePageSelection(
    folder,
    currentTab,
    currentPage
  );

  return (
    <Container>
      <ToolBar
        {...{
          start,
          end,
          nextPage,
          prevPage,
          total: mails.length,
          allSelected,
          toggleAll,
        }}
      />
      <Scrollable>
        {folder === "inbox" && (
          <Tabs>
            {TABS.map((tab) => (
              <Tab
                key={tab}
                name={tab}
                onClick={() => setCurrentTab(tab)}
                active={tab === currentTab}
              >
                {tab}
              </Tab>
            ))}
          </Tabs>
        )}
        <Mails mails={currentPage} />
      </Scrollable>
    </Container>
  );
};

const guard = (Component) => (props) => {
  return /\/(inbox|sent|drafts|trash)$/.test(props.uri) ? (
    <Component {...props} />
  ) : (
    <Redirect to="/inbox" noThrow />
  );
};

export default guard(Mailbox);
