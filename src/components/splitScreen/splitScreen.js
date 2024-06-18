import { Container,Pane } from "./splitScreen.styles"
export const SplitScreen =({
    rightWeight, middleWeight, children
})=>{
    let [ Middle, Right]=children
    return(
      <Container>
       
        <Pane weight={rightWeight}>{Middle}</Pane>
        <Pane weight={middleWeight}>{Right}</Pane>
      </Container>
    )
}