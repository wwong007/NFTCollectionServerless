import { UpdateExpression } from "@aws/dynamodb-expressions";
import { UpdateNFTRequest } from "stacks/NFTCollection/features/UpdateNFT/UpdateNFTRequest";



export function updateNFTExpressionFactoryFromRequest(request: UpdateNFTRequest): UpdateExpression {
  try {
    const { priceSold, dateSold, feeSold, methodSold } = request;
    const updateExpression = new UpdateExpression();
    
    updateExpression.set('priceSold', priceSold);
    updateExpression.set('dateSold', dateSold);
    updateExpression.set('feeSold', feeSold);
    updateExpression.set('methodSold', methodSold);
    updateExpression.set('isSold', true);

    return updateExpression
  } catch (error) {
    throw error;
  };
};