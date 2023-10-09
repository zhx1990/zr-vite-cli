FROM node:18.17.1 as builder

ENV WORKDIR=/fz-hydrology-3d-admin

WORKDIR $WORKDIR

COPY ./ $WORKDIR/

ARG version
ENV COMMITID=$version

RUN ls -al
RUN npm i -g pnpm

RUN pnpm install
RUN pnpm build

FROM nginx:alpine as prod

RUN mkdir /admin

COPY --from=builder /fz-hydrology-3d-admin/dist /fz-hydrology-3d-admin
COPY --from=builder /fz-hydrology-3d-admin/docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
