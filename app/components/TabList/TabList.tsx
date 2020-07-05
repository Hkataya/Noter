import React from 'react';
import styled from 'styled-components';

// **** Style Section **** //
const Wrapper = styled.div.attrs({
  className: 'flex flex-wrap h-full'
})``;

const InnerWrapper = styled.div.attrs({
  className: 'w-full h-full flex flex-col'
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
  className: 'relative min-w-0 w-full shadow-lg h-full'
})``;

// **** Prop Types Section **** //

type ItemProps = {
  color: string;
  bgcolor: string;
};

type Props = {
  componentsArray: Array<any>;
  tabItems: Array<string>;
};

// **** Component Section **** //

export default function TabList(props: Props) {
  const { componentsArray, tabItems } = props;
  const [openTab, setOpenTab] = React.useState(0);

  return (
    <Wrapper>
      <InnerWrapper>
        <TabBar role="tablist">
          {tabItems.map((tabItem, index) => (
            <Tab key={tabItem}>
              <TabItem
                color={openTab === index ? 'whitesmoke' : 'purple'}
                bgcolor={openTab === index ? 'purple' : 'whitesmoke '}
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(index);
                }}
                data-toggle="tab"
                href={`#link${index}`}
                role="tablist"
              >
                {tabItem}
              </TabItem>
            </Tab>
          ))}
        </TabBar>
        <TabContent>
          {componentsArray.map((component, index) => (
            <div
              key={component.key}
              className={
                openTab === index
                  ? 'block h-full  overflow-y-scroll p-2'
                  : 'hidden'
              }
              id={`link${index}`}
            >
              {component}
            </div>
          ))}
        </TabContent>
      </InnerWrapper>
    </Wrapper>
  );
}
