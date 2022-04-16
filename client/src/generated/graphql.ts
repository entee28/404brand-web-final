import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};

export type Product = {
  __typename?: 'Product';
  countInStock: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['Int'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type ProductInput = {
  countInStock: Scalars['Int'];
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  product?: Maybe<Product>;
  products: Array<Product>;
};


export type QueryProductArgs = {
  id: Scalars['Int'];
};

export type ProductQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: number, name: string, price: number, description: string, countInStock: number, imageUrl: string } | null };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string, price: number, description: string, countInStock: number, imageUrl: string }> };


export const ProductDocument = gql`
    query Product($id: Int!) {
  product(id: $id) {
    id
    name
    price
    description
    countInStock
    imageUrl
  }
}
    `;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductsDocument = gql`
    query Products {
  products {
    id
    name
    price
    description
    countInStock
    imageUrl
  }
}
    `;

export function useProductsQuery(options?: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};