import React from "react";
import AppButton from "../components/AppButton";
import { Tab, Tabs } from "@mui/material";

import ScheduleOrUpdateShowView from "../views/ScheduleOrUpdateShowView";
import ShowsView from "../views/ShowsView";
import DialogMenu from "../components/DialogMenu";
import FloatingActionButton from "../components/FloatingActionButton";
import { useAppSelector } from "../selectors/useAppSelector";
import { useDispatch } from "react-redux";
import { updateMainTab } from "../slices/mainTabSlice";
import Header from "../components/Header";

export default function Home() {
  const tab = useAppSelector((state) => state.mainTab.value);
  const dispatch = useDispatch();

  function updateTab(_: React.SyntheticEvent, tab: number) {
    dispatch(updateMainTab(tab));
  }

  return (
    <div className="w-full h-screen flex flex-col bg-black text-white px-[20px] relative overflow-hidden">
      <Header>
        <Tabs
          value={tab}
          onChange={updateTab}
          aria-label="Tabs"
          className="text-primary"
          centered
        >
          <Tab label="Upcoming" />
          <Tab label="Live" />
          {/* <Tab label="Completed" /> */}
        </Tabs>
      </Header>

      <div className="flex-1 w-full text-white pb-[100px] overflow-auto">
        {tab === 0 && <ShowsView type="upcoming" />}
        {tab === 1 && <ShowsView type="live" />}
        {tab === 2 && <ShowsView type="completed" />}
      </div>
      <div className="absolute bottom-4 right-[80px]"></div>
      <DialogMenu
        child={
          <FloatingActionButton>
            <AppButton title="Schedule Show" />
          </FloatingActionButton>
        }
        title="Schedule Show"
        fullScreen
      >
        {(onClose) => <ScheduleOrUpdateShowView onClose={onClose} />}
      </DialogMenu>
    </div>
  );
}
