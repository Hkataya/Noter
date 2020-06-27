import React from 'react';
import styled from 'styled-components';
import NoteListContainer from '../NoteList/NoteListContainer';
import { NoteShapeType } from '../../reducers/entities/types';

const Wrapper = styled.div.attrs({
  className: 'flex flex-wrap'
})``;

const InnerWrapper = styled.div.attrs({
  className: 'w-full'
})``;

const TabBar = styled.ul.attrs({
  className: 'flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row'
})``;

const Tab = styled.li.attrs({
  className: '-mb-px mr-2 last:mr-0 flex-auto text-center'
})``;

const TabItem = styled.a.attrs({
  className: `text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal`
})<ItemProps>`
  color: ${p => p.color};
  background-color: ${p => p.bgcolor};
`;

const TabContent = styled.div.attrs({
  className: 'relative min-w-0 w-full shadow-lg'
})``;

type ItemProps = {
  color: string;
  bgcolor: string;
};

type Props = {
  itemId: string;
};

export default function TabList(props: Props) {
  const { itemId } = props;
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <Wrapper>
      <InnerWrapper>
        <TabBar role="tablist">
          <Tab>
            <TabItem
              color={openTab === 1 ? 'white' : 'blue'}
              bgcolor={openTab === 1 ? 'blue' : 'white'}
              onClick={e => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Notes
            </TabItem>
          </Tab>
        </TabBar>
        <TabContent>
          <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
            <NoteListContainer videoId={itemId} type={NoteShapeType.note} />
          </div>
        </TabContent>
      </InnerWrapper>
    </Wrapper>
  );
}
