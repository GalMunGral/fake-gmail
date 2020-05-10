import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "@reach/router";
import Tab from "./Tab";
import Mails from "./Mails";
import usePagination from "../hooks/pagination";
import useMails from "../hooks/mails";
import usePageSelection from "../hooks/pageSelection";
import Layout from "./Layout";
import MailboxButtons from "./MailboxButtons";

const PAGE_SIZE = 50;
const tabs = ["primary", "social", "promotions"];

const Tabs = styled.div`
  flex: 0 0 50px;
  display: flex;
  justify-content: start;
  border-bottom: 1px solid var(--light-gray);
`;

const Mailbox = () => {
  const { folder } = useParams();
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const mails = useMails(folder, currentTab);
  const [start, end, nextPage, prevPage, resetPage] = usePagination(
    PAGE_SIZE,
    mails.length
  );
  const currentPage = mails.slice(start, end);
  const [allSelected, toggleAll] = usePageSelection(
    folder,
    currentTab,
    currentPage
  );

  useEffect(() => {
    resetPage();
  }, [folder, currentTab, resetPage]);

  return (
    <Layout>
      <MailboxButtons
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
      <>
        {folder === "inbox" && (
          <Tabs>
            {tabs.map((tab) => (
              <Tab
                key={tab}
                name={tab}
                onClick={() => setCurrentTab(tab)}
                active={tab === currentTab}
              />
            ))}
          </Tabs>
        )}
        <Mails mails={currentPage} />
      </>
    </Layout>
  );
};

export default Mailbox;
