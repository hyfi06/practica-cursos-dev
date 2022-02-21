#!/usr/bin/env bash
trap 'echo stoploop && exit 0' SIGTERM
while true; do :; done
